import { PageHeader } from "@/components/PageHeader"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { ProductsTypeList } from "@/pages/Settings/ProductsType/list"
import { Container } from "@/pages/Settings/Users/styles"
import { Button } from "antd"
import { CirclesThreePlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"

export const ManageProductsType = () => {
	const [_, setSearchParams] = useSearchParams()

	const handleCreateProductType = () => {
		setSearchParams((params) => {
			params.set("action", "create_product")
			return params
		})
	}

	return (
		<>
			<TitlePage title="Configurações de tipos de produto" />
			<Title>Configurações de tipos de produto</Title>
			<Container>
				<PageHeader
					searchQuery={"productType"}
					placeholder={"Buscar tipo de produto"}
					rightContent={
						<Button
							type="primary"
							icon={<CirclesThreePlus size={20} />}
							onClick={handleCreateProductType}
						>
							Novo tipo de produto
						</Button>
					}
				/>
				<ProductsTypeList />
			</Container>
		</>
	)
}
