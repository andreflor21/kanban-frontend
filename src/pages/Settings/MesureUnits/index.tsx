import { PageHeader } from "@/components/PageHeader"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { MesureUnitsList } from "@/pages/Settings/MesureUnits/list"
import { MesureUnitForm } from "@/pages/Settings/MesureUnits/mesureUnitForm"
import { Container } from "@/pages/Settings/Users/styles"
import { Button } from "antd"
import { CirclesThreePlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"

export const ManageMesureUnits = () => {
	const [_, setSearchParams] = useSearchParams()

	const handleCreateMesureUnit = () => {
		setSearchParams((params) => {
			params.set("action", "create_mesure_unit")
			return params
		})
	}

	return (
		<>
			<TitlePage title="Configurações de unidades de medida" />
			<Title>Configurações de unidades de medida</Title>
			<Container>
				<PageHeader
					searchQuery={"mesureUnit"}
					placeholder={"Buscar unidade de medida"}
					rightContent={
						<Button
							type="primary"
							icon={<CirclesThreePlus size={20} />}
							onClick={handleCreateMesureUnit}
						>
							Novo unidade de medida
						</Button>
					}
				/>
				<MesureUnitsList />
				<MesureUnitForm />
			</Container>
		</>
	)
}
