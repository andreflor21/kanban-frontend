import Button from "@/components/Button"
import { DeliveryDaysForm } from "@/pages/Suppliers/DeliveryDaysForm"
import { DeliveryDaysTable } from "@/pages/Suppliers/DeliveryDaysForm/Table"
import { DELIVERY_DAYS_OPTIONS } from "@/pages/Suppliers/DeliveryDaysForm/schema"
import type { Suppliers } from "@/services/useGetSuppliers"
import { FormFooter } from "@/style/global"
import { Alert, Collapse } from "antd"
import { useState } from "react"
import * as S from "./styles"

type DeliveryDaysProps = {
	supplier: Suppliers | undefined
}

const mockedDeliveryDays: Suppliers["deliveryDays"] = [
	{
		id: "1",
		days: 1,
		period: "Manhã",
		hour: "10:00",
	},
	{
		id: "2",
		days: 2,
		period: "Tarde",
		hour: "13:30",
	},
	{
		id: "3",
		days: 3,
		period: "",
		hour: "",
	},
]

export const DeliveryDays = ({ supplier }: DeliveryDaysProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	if (!supplier) return null
	const deliveryDays = supplier?.deliveryDays ?? []

	const tableOptions = DELIVERY_DAYS_OPTIONS.map((option) => {
		const hasOption = deliveryDays.find((day) => day.days === option.id)
		if (!hasOption) return undefined
		return {
			...option,
			time: hasOption?.hour ?? "",
			period: hasOption?.period ?? "",
			checked: !!hasOption,
			deliveryId: `${hasOption?.id}`,
		}
	}).filter((option) => !!option)

	return (
		<S.AddressWrapper>
			{deliveryDays?.length ? (
				<Collapse
					items={[
						{
							key: "dias",
							label: `Dias de entrega (${deliveryDays.length})`,
							children: (
								<DeliveryDaysTable deliveryDays={tableOptions} isReadOnly />
							),
						},
					]}
				/>
			) : (
				<Alert
					message={"Não há dias de entrega definidos"}
					type={"warning"}
					showIcon
					style={{ marginBottom: 16 }}
				/>
			)}

			<FormFooter>
				<Button type={"primary"} onClick={() => setIsFormOpen(true)}>
					{deliveryDays?.length
						? "Editar dias de entrega"
						: "Adicionar dias de entrega"}
				</Button>
			</FormFooter>
			<DeliveryDaysForm
				isModalOpen={isFormOpen}
				setIsModalOpen={setIsFormOpen}
				currentDeliveryDays={{ allDays: tableOptions }}
			/>
		</S.AddressWrapper>
	)
}
