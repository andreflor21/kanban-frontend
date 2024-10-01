import { PageHeader } from "@/components/PageHeader"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { ProductsList } from "@/pages/Products/List"
import { ProductForm } from "@/pages/Products/ProductForm"
import { PageContainer } from "@/style/global"
import { Button } from "antd"
import { FolderPlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"

const Products = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const handleCreateProduct = () => {
		setSearchParams((params) => {
			params.set("action", "create_product")
			return params
		})
	}

	return (
		<>
			<TitlePage title="Produtos" />
			<Title>Produtos</Title>
			<PageContainer>
				<PageHeader
					searchQuery={"product"}
					placeholder={"Buscar produto"}
					rightContent={
						<Button
							type="primary"
							icon={<FolderPlus size={20} />}
							onClick={handleCreateProduct}
						>
							Novo Produto
						</Button>
					}
				/>
				<ProductsList />
				<ProductForm />
			</PageContainer>
		</>
	)
}

export default Products
