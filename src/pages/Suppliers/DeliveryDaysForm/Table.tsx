import {
	type DaySchemaType,
	DELIVERY_DAYS_OPTIONS,
	PERIODS,
} from "@/pages/Suppliers/DeliveryDaysForm/schema"
import {
	Checkbox,
	Select,
	Table,
	type TableColumnsType,
	Tag,
	TimePicker,
} from "antd"
import dayjs from "dayjs"
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
				const isChecked = !!deliveryDays?.find(
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
						value={record?.period}
					/>
				)
			},
		},
		{
			title: "Horário",
			dataIndex: "time",
			key: "time",
			render: (_, record) => {
				const isChecked = !!deliveryDays?.find(
					(day) => day.id === record.id && day.checked,
				)
				if (isReadOnly) {
					return (
						<Tag>
							{record?.time ? dayjs(record.time, "HH:mm").format("HH:mm") : "-"}
						</Tag>
					)
				}
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
					/>
				)
			},
		},
	]
	return (
		<S.PageWrapper>
			<Table
				columns={tableColumns}
				dataSource={isReadOnly ? deliveryDays : DELIVERY_DAYS_OPTIONS}
				pagination={false}
				rowClassName={"row"}
			/>
		</S.PageWrapper>
	)
}
