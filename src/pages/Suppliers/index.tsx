import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { SuppliersList } from "@/pages/Suppliers/List"
import { PageContainer } from "@/style/global"

const Suppliers = () => {
	return (
		<>
			<TitlePage title="Fornecedores" />
			<Title>Fornecedores</Title>
			<PageContainer>
				<SuppliersList />
			</PageContainer>
		</>
	)
}

export default Suppliers
