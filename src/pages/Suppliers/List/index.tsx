import { PageHeader } from "@/components/PageHeader"
import { NewSupplier } from "@/pages/Suppliers/List/NewSupplier"
import { SuppliersTable } from "@/pages/Suppliers/List/Table"
import { Button, Drawer } from "antd"
import { FolderPlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"

export const SuppliersList = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const handleCreateSupplier = () => {
		setSearchParams((params) => {
			params.set("action", "create_supplier")
			return params
		})
	}
	const isDrawerOpen = searchParams.get("action") === "create_supplier"
	return (
		<div>
			<PageHeader
				searchQuery={"supplier"}
				placeholder={"Buscar fornecedor por nome ou CNPJ"}
				rightContent={
					<Button
						type="primary"
						icon={<FolderPlus size={20} />}
						onClick={handleCreateSupplier}
					>
						Novo fornecedor
					</Button>
				}
			/>
			<SuppliersTable />
			<Drawer
				title="Novo fornecedor"
				placement="right"
				width={600}
				open={isDrawerOpen}
				onClose={() => {
					setSearchParams((params) => {
						params.delete("action")
						return params
					})
				}}
			>
				<NewSupplier />
			</Drawer>
		</div>
	)
}
