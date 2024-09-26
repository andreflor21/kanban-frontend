import {
	type DaySchemaType,
	type DeliveryDaysSchemaType,
	EMPTY_DELIVERY_DAYS,
	OPTIONS,
	PERIODS,
	deliveryDaysSchema,
} from "@/pages/Suppliers/DeliveryDaysForm/schema"
import { yupResolver } from "@hookform/resolvers/yup"
import {
	Checkbox,
	Modal,
	Select,
	Table,
	type TableColumnsType,
	TimePicker,
} from "antd"
import type dayjs from "dayjs"
import type { Dispatch } from "react"
import { useForm } from "react-hook-form"
import * as S from "./styles"

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

	const handleToggleSelect = (option: (typeof OPTIONS)[number]) => {
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
					...OPTIONS.find((option) => option.id === id),
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
					...OPTIONS.find((option) => option.id === id),
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

	const tableColumns: TableColumnsType<DaySchemaType> = [
		{
			title: "Dia",
			dataIndex: "id",
			key: "id",
			onCell: (record) => ({
				onClick: () => handleToggleSelect(record),
			}),
			render: (_, record) => {
				const isChecked = !!watch("allDays")?.find(
					(day) => day.id === record.id && day.checked,
				)
				return (
					<S.DayWrapper>
						<Checkbox
							checked={isChecked}
							onChange={() => handleToggleSelect(record)}
						/>
						{record?.key}
					</S.DayWrapper>
				)
			},
		},
		{
			title: "Período",
			dataIndex: "period",
			key: "period",
			render: (_, record) => {
				const isChecked = !!watch("allDays")?.find(
					(day) => day.id === record.id && day.checked,
				)
				return (
					<Select
						options={PERIODS}
						placeholder={"Período"}
						disabled={!isChecked}
						onChange={(value) => {
							if (typeof record?.id !== "number") return
							handleChangePeriod(value, record.id)
						}}
					/>
				)
			},
		},
		{
			title: "Horário",
			dataIndex: "time",
			key: "time",
			render: (_, record) => {
				const isChecked = !!watch("allDays")?.find(
					(day) => day.id === record.id && day.checked,
				)
				return (
					<TimePicker
						onChange={(time) => {
							if (typeof record?.id !== "number") return
							handleSelectTime(time, record.id)
						}}
						format={"HH:mm"}
						minuteStep={10}
						placeholder={"Horário"}
						showNow={false}
						disabled={!isChecked}
					/>
				)
			},
		},
	]

	return (
		<Modal
			open={isModalOpen}
			onClose={handleClose}
			onCancel={handleClose}
			okText={"Salvar"}
			cancelText={"Cancelar"}
			title={"Editar dias de entrega"}
		>
			<S.PageWrapper>
				<Table
					columns={tableColumns}
					dataSource={OPTIONS}
					pagination={false}
					rowClassName={"row"}
				/>
			</S.PageWrapper>
		</Modal>
	)
}
