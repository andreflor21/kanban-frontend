import { useGetNotification } from "@/hooks/useGetNotification"
import { DeliveryDaysTable } from "@/pages/Suppliers/DeliveryDaysForm/Table"
import {
	DELIVERY_DAYS_OPTIONS,
	type DeliveryDaysSchemaType,
	EMPTY_DELIVERY_DAYS,
	deliveryDaysSchema,
} from "@/pages/Suppliers/DeliveryDaysForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "antd"
import type dayjs from "dayjs"
import type { Dispatch } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

type DeliveryDaysFormProps = {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
}

export const DeliveryDaysForm = ({
	isModalOpen,
	setIsModalOpen,
}: DeliveryDaysFormProps) => {
	const { watch, setValue, getValues } = useForm<DeliveryDaysSchemaType>({
		resolver: yupResolver(deliveryDaysSchema),
		values: EMPTY_DELIVERY_DAYS,
		defaultValues: EMPTY_DELIVERY_DAYS,
	})
	const [searchParams] = useSearchParams()
	const supplierId = searchParams.get("supplier_id")
	const { addDeliveryDays } = useGetSuppliersActions()
	const { query: suppliersQuery } = useGetSuppliers()
	const { showNotification } = useGetNotification()

	if (!supplierId) return null

	const handleToggleSelect = (
		option: (typeof DELIVERY_DAYS_OPTIONS)[number],
	) => {
		const allDays = getValues("allDays")
		if (!allDays?.length) {
			setValue("allDays", [
				{
					...option,
					checked: true,
				},
			])
			return
		}

		const isIncluded = allDays.find(
			(day) => day.id === option.id && day.checked,
		)

		const updatedValue = isIncluded
			? allDays.filter((day) => day.id !== option.id)
			: [...allDays, { ...option, checked: true }]

		setValue("allDays", updatedValue)
	}

	const handleClose = () => {
		setValue("allDays", [])
		setIsModalOpen(false)
	}

	console.log(watch("allDays"))

	const handleSelectTime = (time: dayjs.Dayjs, id: number) => {
		const allDays = getValues("allDays")
		if (!allDays?.length) {
			setValue("allDays", [
				{
					...DELIVERY_DAYS_OPTIONS.find((option) => option.id === id),
					time: time.format("HH:mm"),
				},
			])
			return
		}
		const updatedValue = allDays.map((day) => {
			if (day.id === id) {
				return {
					...day,
					time: time.format("HH:mm"),
				}
			}
			return day
		})
		setValue("allDays", updatedValue)
	}

	const handleChangePeriod = (period: string, id: number) => {
		const allDays = getValues("allDays")
		if (!allDays?.length) {
			setValue("allDays", [
				{
					...DELIVERY_DAYS_OPTIONS.find((option) => option.id === id),
					period,
				},
			])
			return
		}
		const updatedValue = allDays.map((day) => {
			if (day.id === id) {
				return {
					...day,
					period,
				}
			}
			return day
		})
		setValue("allDays", updatedValue)
	}

	const handleSubmit = async () => {
		const values = getValues()
		if (!values?.allDays?.length) return

		const body = values.allDays
			.map((day) => {
				if (!day?.id) return
				return {
					days: day.id,
					period: day.period,
					hour: day.time,
					id: String(day.id),
				}
			})
			.filter((value) => !!value)

		try {
			await addDeliveryDays(supplierId, body)
			await suppliersQuery.refetch()
			setIsModalOpen(false)
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao salvar dias de entrega",
				description: "Verifique seus dados e tente novamente",
			})
		}
	}

	return (
		<Modal
			open={isModalOpen}
			onClose={handleClose}
			onCancel={handleClose}
			okText={"Salvar"}
			cancelText={"Cancelar"}
			title={"Editar dias de entrega"}
			onOk={handleSubmit}
		>
			<DeliveryDaysTable
				deliveryDays={watch("allDays") ?? []}
				handleToggleSelect={handleToggleSelect}
				handleChangePeriod={handleChangePeriod}
				handleSelectTime={handleSelectTime}
			/>
		</Modal>
	)
}
