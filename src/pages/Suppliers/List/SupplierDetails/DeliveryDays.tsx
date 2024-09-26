import Button from "@/components/Button"
import { DeliveryDaysForm } from "@/pages/Suppliers/DeliveryDaysForm"
import { AddressCard } from "@/pages/Suppliers/List/SupplierDetails/AddressCard"
import type { Suppliers } from "@/services/useGetSuppliers"
import { FormFooter } from "@/style/global"
import { Collapse, Typography } from "antd"
import { useState } from "react"
import * as S from "./styles"

type DeliveryDaysProps = {
	supplier: Suppliers | undefined
}

export const DeliveryDays = ({ supplier }: DeliveryDaysProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	if (!supplier) return null
	return (
		<S.AddressWrapper>
			<Typography.Title level={4}>Dias de entrega</Typography.Title>
			<Collapse
				items={supplier?.addresses?.map((address) => ({
					key: address.id,
					label: `${address.lograd}  ${address.number ? `- ${address.number}` : ""}`,
					children: <AddressCard address={address} />,
				}))}
			/>
			<FormFooter>
				<Button type={"primary"} onClick={() => setIsFormOpen(true)}>
					Editar dias de entrega
				</Button>
			</FormFooter>
			<DeliveryDaysForm
				isModalOpen={isFormOpen}
				setIsModalOpen={setIsFormOpen}
			/>
		</S.AddressWrapper>
	)
}
