import Button from "@/components/Button"
import { InfoLine } from "@/components/InfoLine"
import { cepMask, getTextValue } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type AddressType,
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { Card, Popconfirm } from "antd"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

type AdressCardProps = {
	address: AddressType
}

export const AddressCard = ({ address }: AdressCardProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isDeleting, setIsDeleting] = useState(false)
	const { query: suppliersQuery } = useGetSuppliers()
	const { deleteAddress } = useGetSuppliersActions()
	const { showNotification } = useGetNotification()

	const supplierId = searchParams.get("supplier_id")

	const handleEditAddress = (id: string) => {
		setSearchParams((params) => {
			params.set("action", "edit_address")
			params.set("address_id", id)
			return params
		})
	}

	const handleDeleteAddress = async (id: string) => {
		if (!supplierId) return
		setIsDeleting(true)
		try {
			await deleteAddress(supplierId, id)
			await suppliersQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Endereço excluído com sucesso",
				description: "",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao excluir endereço",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<Card
			key={address.id}
			actions={[
				<Button
					type={"link"}
					key={"edit"}
					onClick={() => handleEditAddress(address.id)}
				>
					Editar
				</Button>,
				<Popconfirm
					key={"delete"}
					title={`Tem certeza que deseja excluir o endereço ${address.lograd}?`}
					onConfirm={() => handleDeleteAddress(address.id)}
					okText={"Excluir"}
					cancelText={"Cancelar"}
					placement={"topLeft"}
					okButtonProps={{ loading: isDeleting }}
				>
					<Button type={"link"} danger>
						Excluir
					</Button>
				</Popconfirm>,
			]}
		>
			<InfoLine title={"Logradouro"}>{getTextValue(address.lograd)}</InfoLine>
			<InfoLine title={"Número"}>{getTextValue(address.number)}</InfoLine>
			<InfoLine title={"Complemento"}>
				{getTextValue(address.complement)}
			</InfoLine>
			<InfoLine title={"Bairro"}>{getTextValue(address.district)}</InfoLine>
			<InfoLine title={"Cidade"}>{getTextValue(address.city)}</InfoLine>
			<InfoLine title={"Estado"}>{getTextValue(address.state)}</InfoLine>
			<InfoLine
				title={"CEP"}
				copyable={{
					text: address.zipcode,
				}}
			>
				{address.zipcode ? cepMask(address.zipcode) : "-"}
			</InfoLine>
		</Card>
	)
}
