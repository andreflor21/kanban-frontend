import Button from "@/components/Button"
import { InfoLine } from "@/components/InfoLine"
import {
	cepMask,
	cnpjMask,
	getTextValue,
	onlyNumbersCnpj,
} from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { FormFooter } from "@/style/global"
import { Card, Divider, Drawer, Popconfirm, Space, Tag, Typography } from "antd"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

export const SupplierDetails = () => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: suppliers, query: suppliersQuery } = useGetSuppliers()
	const { deleteAddress } = useGetSuppliersActions()
	const supplierId = searchParams.get("supplier_id")
	const supplier = suppliers?.suppliers.find(
		(supplier) => supplier.id === supplierId,
	)
	const { showNotification } = useGetNotification()
	const isDrawerOpen = !!supplierId && !!supplier?.id

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

	const handleEditAddress = (id: string) => {
		setSearchParams((params) => {
			params.set("action", "edit_address")
			params.set("address_id", id)
			return params
		})
	}

	const handleCreateAddress = () => {
		setSearchParams((params) => {
			params.set("action", "create_address")
			return params
		})
	}

	return (
		<Drawer
			title="Detalhes do fornecedor"
			open={isDrawerOpen}
			width={600}
			onClose={() => {
				setSearchParams((params) => {
					params.delete("supplier_id")
					return params
				})
			}}
			extra={
				<Space>
					<Button
						onClick={() => {
							setSearchParams((params) => {
								if (!supplierId) return params
								params.set("edit_supplier_id", supplierId)
								params.delete("supplier_id")
								return params
							})
						}}
					>
						Editar fornecedor
					</Button>
				</Space>
			}
		>
			<div>
				<InfoLine title={"Nome"}>{getTextValue(supplier?.name)}</InfoLine>
				<InfoLine
					title={"CNPJ"}
					copyable={{
						text: supplier?.cnpj ? onlyNumbersCnpj(supplier.cnpj) : "",
					}}
				>
					{supplier?.cnpj ? cnpjMask(supplier.cnpj) : <i>Não informado</i>}
				</InfoLine>
				<InfoLine title={"Razão Social"}>
					{getTextValue(supplier?.legalName)}
				</InfoLine>
				<InfoLine title={"Código do ERP"}>
					{getTextValue(supplier?.ERPcode)}
				</InfoLine>
				<InfoLine title={"Código"}>{getTextValue(supplier?.code)}</InfoLine>
				<InfoLine title={"Telefone"}>{getTextValue(supplier?.fone)}</InfoLine>
				<InfoLine title={"Email"} copyable={!!supplier?.email}>
					{getTextValue(supplier?.email)}
				</InfoLine>
				<InfoLine title={"Usuários"}>
					{supplier?.users?.map((user) => (
						<Tag key={user.id}>{user.name}</Tag>
					))}
				</InfoLine>
			</div>
			<Divider />
			<S.AddressWrapper>
				<Typography.Title level={4}>
					Endereços{" "}
					<Typography.Text type="secondary">
						({supplier?.addresses?.length})
					</Typography.Text>
				</Typography.Title>
				{supplier?.addresses?.map((address) => (
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
						<InfoLine title={"Logradouro"}>
							{getTextValue(address.lograd)}
						</InfoLine>
						<InfoLine title={"Número"}>{getTextValue(address.number)}</InfoLine>
						<InfoLine title={"Complemento"}>
							{getTextValue(address.complement)}
						</InfoLine>
						<InfoLine title={"Bairro"}>
							{getTextValue(address.district)}
						</InfoLine>
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
				))}
				<FormFooter>
					<Button type={"primary"} onClick={handleCreateAddress}>
						Adicionar endereço
					</Button>
				</FormFooter>
			</S.AddressWrapper>
		</Drawer>
	)
}
