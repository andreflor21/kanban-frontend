import Button from "@/components/Button"
import { InfoLine } from "@/components/InfoLine"
import { cnpjMask, onlyNumbersCnpj } from "@/helpers/general"
import { useGetSuppliers } from "@/services/useGetSuppliers"
import { Divider, Drawer, Space, Typography } from "antd"
import { useSearchParams } from "react-router-dom"

export const SupplierDetails = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: suppliers } = useGetSuppliers()
	const supplierId = searchParams.get("supplier_id")
	const supplier = suppliers?.suppliers.find(
		(supplier) => supplier.id === supplierId,
	)
	const isDrawerOpen = !!supplierId && !!supplier?.id

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
				<Typography.Title level={4}>Detalhes do fornecedor</Typography.Title>
				<InfoLine title={"Nome"}>{supplier?.name}</InfoLine>
				<InfoLine
					title={"CNPJ"}
					copyable={{
						text: supplier?.cnpj ? onlyNumbersCnpj(supplier.cnpj) : "",
					}}
				>
					{supplier?.cnpj ? cnpjMask(supplier.cnpj) : "-"}
				</InfoLine>
				<InfoLine title={"Razão Social"}>{supplier?.legalName}</InfoLine>
				<InfoLine title={"Código do ERP"}>{supplier?.ERPCode}</InfoLine>
				<InfoLine title={"Código"}>{supplier?.code}</InfoLine>
				<InfoLine title={"Telefone"}>{supplier?.fone}</InfoLine>
				<InfoLine title={"Email"} copyable>
					{supplier?.email}
				</InfoLine>
				<InfoLine title={"Usuários"}>
					{supplier?.users?.map((user) => user.name).join(", ")}
				</InfoLine>
			</div>
			<Divider />
			<div>
				<Typography.Title level={4}>Endereços</Typography.Title>
				{supplier?.addresses?.map((address) => (
					<div key={address.id}>
						<InfoLine title={"Logradouro"}>{address.lograd}</InfoLine>
						<InfoLine title={"Número"}>{address.number}</InfoLine>
						<InfoLine title={"Complemento"}>{address.complement}</InfoLine>
						<InfoLine title={"Bairro"}>{address.district}</InfoLine>
						<InfoLine title={"Cidade"}>{address.city}</InfoLine>
						<InfoLine title={"Estado"}>{address.state}</InfoLine>
						<InfoLine title={"CEP"} copyable>
							{address.zipcode}
						</InfoLine>
					</div>
				))}
			</div>
		</Drawer>
	)
}
