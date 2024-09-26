import { List, Skeleton, Tooltip } from "antd"

import { Confirm } from "@/components/Confirm"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { DotsNine, Plus, Trash, WarningCircle } from "phosphor-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Container, ContainerButtons, LinkStyleld } from "./styles"

const Section = () => {
	// const { getSections, sections, deleteSection } = useSection()
	const sections: unknown[] = []
	const getSections = () => {
		console.log("getSections")
	}
	const deleteSection = () => {
		console.log("deleteSection")
	}
	const [load, setLoad] = useState(true)

	// useEffect(() => {
	// setLoad(false);
	// getSections(setLoad)
	// }, [getSections])

	const handleDelete = (id: string) => {
		// deleteSection(id)
		console.log(id)
		// message.success('Usuário excluido');
	}
	return (
		<>
			<TitlePage title="Configurações" />
			<Title>Seções</Title>
			<Container>
				<ContainerButtons>
					<LinkStyleld to="novo">
						<span>Nova Seção</span>
						<Plus weight="bold" />
					</LinkStyleld>
					<LinkStyleld to="tipos">
						<span>Tipos de seção</span>
						<DotsNine weight="bold" />
					</LinkStyleld>
				</ContainerButtons>
				<List
					itemLayout="horizontal"
					style={{
						marginRight: "2rem",
					}}
					dataSource={sections}
					pagination={{ position: "bottom", align: "end" }}
					renderItem={(p) => (
						<List.Item
							actions={[
								<Confirm
									key={p.id}
									title="Deseja excluir a seção"
									cancelText="Cancelar"
									okText="Excluir"
									placement="topRight"
									onConfirm={() => handleDelete(p.id.toString())}
									style={{ cursor: "pointer" }}
									icon={<WarningCircle size={24} color={"#ef4444"} />}
								>
									<Tooltip title="Excluir">
										<Trash size={18} style={{ cursor: "pointer" }} />
									</Tooltip>
								</Confirm>,
							]}
							style={{ fontFamily: "var(--font-standard)" }}
						>
							<Skeleton
								loading={load}
								active
								title
								paragraph={{ rows: 2 }}
								style={{ width: "50%" }}
							>
								<List.Item.Meta
									title={
										<Link to={`${p.id}`}>
											{p.codigo ? p.codigo : null} {p.descricao}
										</Link>
									}
									description={`Tipo: ${
										p.tipoSecao.descricao
									} (${p.tipoSecao.abreviacao}) | Cód ERP: ${
										p.codigoERP ? p.codigoERP : ""
									}`}
								/>
							</Skeleton>
						</List.Item>
					)}
				/>
			</Container>
		</>
	)
}

export default Section
