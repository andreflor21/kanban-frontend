import { PageHeader } from "@/components/PageHeader"
import { SuppliersTable } from "@/pages/Suppliers/List/Table"
import { Button } from "antd"
import { FolderPlus } from "phosphor-react"

export const SuppliersList = () => {
	const handleCreateSupplier = () => {
		console.log("create supplier")
	}
	return (
		<div>
			<PageHeader
				searchQuery={"supplier"}
				placeholder={"Buscar fornecedor"}
				rightContent={
					<>
						<Button
							type="primary"
							icon={<FolderPlus />}
							onClick={handleCreateSupplier}
						>
							Novo fornecedor
						</Button>
					</>
				}
			/>
			<SuppliersTable />
		</div>
	)
}
