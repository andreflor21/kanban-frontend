import { useGetNotification } from "@/hooks/useGetNotification"
import {
	DELIVERY_DAYS_OPTIONS,
	type DaySchemaType,
	PERIODS,
} from "@/pages/Suppliers/DeliveryDaysForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import {
	Checkbox,
	Popconfirm,
	Select,
	Table,
	type TableColumnsType,
	Tag,
	TimePicker,
} from "antd"
import dayjs from "dayjs"
import { Trash } from "phosphor-react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

type TableProps = {
	deliveryDays: DaySchemaType[]
	handleToggleSelect?: (option: DaySchemaType) => void
	handleChangePeriod?: (period: string, id: number) => void
	handleSelectTime?: (time: dayjs.Dayjs, id: number) => void
	isReadOnly?: boolean
}

export const DeliveryDaysTable = ({
	deliveryDays,
	handleToggleSelect,
	handleChangePeriod,
	handleSelectTime,
	isReadOnly,
}: TableProps) => {
	const [searchParams] = useSearchParams()
	const supplierId = searchParams.get("supplier_id")
	const { deleteDeliveryDays } = useGetSuppliersActions()
	const { query: suppliersQuery } = useGetSuppliers()
	const { showNotification } = useGetNotification()
	const [isDeleting, setIsDeleting] = useState(false)

	const handleDelete = async (id: string) => {
		if (!supplierId) return

		setIsDeleting(true)
		try {
			await deleteDeliveryDays(supplierId, id)
			await suppliersQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Dia excluído com sucesso",
				description: "",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao excluir dia",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsDeleting(false)
		}
	}

	const tableColumns: TableColumnsType<DaySchemaType> = [
		{
			title: "Dia",
			dataIndex: "id",
			key: "id",
			onCell: (record) => ({
				onClick: () => handleToggleSelect?.(record),
			}),
			render: (_, record) => {
				const isChecked = !!deliveryDays?.find(
					(day) => day.id === record.id && day.checked,
				)
				return (
					<S.DayWrapper>
						{!isReadOnly && (
							<Checkbox
								checked={isChecked}
								onClick={() => handleToggleSelect?.(record)}
								onChange={() => handleToggleSelect?.(record)}
							/>
						)}
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
				const isChecked = deliveryDays?.find(
					(day) => day.id === record.id && day.checked,
				)

				if (isReadOnly) return <Tag>{record?.period ? record.period : "-"}</Tag>
				return (
					<Select
						options={PERIODS}
						placeholder={"Período"}
						disabled={!isChecked}
						onChange={(value) => {
							if (typeof record?.id !== "number") return
							handleChangePeriod?.(value, record.id)
						}}
						value={isChecked?.period ?? record?.period}
					/>
				)
			},
		},
		{
			title: "Horário",
			dataIndex: "time",
			key: "time",
			render: (_, record) => {
				const isChecked = deliveryDays?.find(
					(day) => day.id === record.id && day.checked,
				)
				if (isReadOnly) {
					return (
						<Tag>
							{record?.time ? dayjs(record.time, "HH:mm").format("HH:mm") : "-"}
						</Tag>
					)
				}
				const hasTime = !!isChecked?.time?.length || !!record?.time?.length
				return (
					<TimePicker
						onChange={(time) => {
							if (typeof record?.id !== "number") return
							handleSelectTime?.(time, record.id)
						}}
						format={"HH:mm"}
						minuteStep={10}
						placeholder={"Horário"}
						showNow={false}
						disabled={!isChecked || isReadOnly}
						value={
							hasTime
								? dayjs(isChecked?.time ?? record?.time, "HH:mm")
								: undefined
						}
					/>
				)
			},
		},
	]

	if (isReadOnly) {
		tableColumns.push({
			title: "",
			dataIndex: "action",
			key: "action",
			render: (_, record) => {
				return (
					<Popconfirm
						key={record.id}
						title={`Tem certeza que deseja excluir o dia ${record?.key}?`}
						onConfirm={() => handleDelete(record?.deliveryId ?? "")}
						okText={"Deletar"}
						cancelText={"Cancelar"}
						placement={"topLeft"}
						okButtonProps={{ loading: isDeleting }}
					>
						<Trash className={"delete"} />
					</Popconfirm>
				)
			},
		})
	}

	const getDataSource = () => {
		if (isReadOnly) return deliveryDays
		return DELIVERY_DAYS_OPTIONS
	}

	return (
		<S.PageWrapper>
			<Table
				columns={tableColumns}
				dataSource={getDataSource()}
				pagination={false}
				rowClassName={"row"}
			/>
		</S.PageWrapper>
	)
}
