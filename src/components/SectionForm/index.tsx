import { useSection } from "@/providers/Sections"
import type { Section } from "@/types/secao"
import type React from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"
import Button from "../Button"
import Input from "../Input"
import Title from "../Title"
import TitlePage from "../TitlePage"
import {
	Container,
	ContainerButtons,
	ContainerSelect,
	FormStyled,
	LabelStyled,
	OptionStyled,
	SelectStyled,
} from "./styles"

interface SectionFormProps {
	section?: Section | null
	sectionId?: string
	action: "create" | "duplicate" | "edit"
	className?: string
	title: string
}
interface SectionData {
	descricao: string
	codigo: string
	codigoMatrizFilial: string
	codigoERP?: string
	tipoSecaoId: number | string
}
const SecitonForm = ({
	action,
	sectionId,
	className,
	title,
}: SectionFormProps) => {
	const { secaoId } = useParams()
	const navigate = useNavigate()
	const [section, setSection] = useState<string>("")
	const [descricaoError, setDescricaoError] = useState<boolean>(false)
	const [codigoError, setCodigoError] = useState<boolean>(false)
	const [codigoMatrizFilialError, setCodigoMatrizFilialError] =
		useState<boolean>(false)
	const [codigoERPError, setcodigoERPError] = useState<boolean>(false)
	const [tipoError, setTipoError] = useState<boolean>(false)
	const [, setLoad] = useState(true)
	const { newSection, editSection, sections } = useSection()

	if (!sectionId) {
		sectionId = secaoId
	}
	const s = sections.find((s) => s.id === Number.parseInt(sectionId as string))
	const [descricao, setDescricao] = useState(s?.descricao)
	const [codigo, setCodigo] = useState(s?.codigo)
	const [codigoERP, setCodigoERP] = useState(s?.codigoERP)
	const [codigoMatrizFilial, setCodigoMatrizFilial] = useState(
		s?.codigoMatrizFilial,
	)
	const [tipoSecaoId, setTipoSecaoId] = useState(s?.tipoSecao.id.toString())

	const goBack = (path: string) => {
		navigate(path)
	}
	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault()

		const updateObject: SectionData = {
			descricao: descricao as string,
			codigo: codigo as string,
			codigoERP: codigoERP as string,
			codigoMatrizFilial: codigoMatrizFilial as string,
			tipoSecaoId: tipoSecaoId as string,
		}

		const schema = yup.object().shape({
			descricao: yup.string().required("Campo Obrigatório"),
			codigo: yup.string().required("Campo Obrigatório"),
			codigoERP: yup.string(),
			codigoMatrizFilial: yup.string().required("Campo Obrigatório"),
			tipoSecaoId: yup.string().required("Campo Obrigatório"),
		})

		await schema
			.validate({ ...updateObject })
			.then((v) => {
				if (action === "create") {
					newSection(v, setLoad, navigate)
				} else if (action === "edit" && sectionId) {
					editSection(v, sectionId)
				}
			})
			.catch(() => {
				descricao === "" && setDescricaoError(true)
				codigo === "" && setCodigoError(true)
				codigoMatrizFilial === "" && setCodigoMatrizFilialError(true)
				!tipoSecaoId && setTipoError(true)
			})
	}
	return (
		<>
			<TitlePage title="Seções" />
			<Title>{title}</Title>
			<Container>
				<FormStyled className={className}>
					<Input
						label="Descrição"
						inputType="text"
						placeholder="Nome da seção"
						errorMessage="Campo Obrigatório"
						value={descricao}
						error={descricaoError}
						name="nome"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setDescricao(e.target.value)
							setDescricaoError(false)
						}}
					/>
					<Input
						label="Código"
						inputType="text"
						placeholder="Código"
						errorMessage="Campo Obrigatório"
						value={codigo}
						error={codigoError}
						name="codigo"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCodigo(e.target.value)
							setCodigoError(false)
						}}
					/>
					<Input
						label="Código ERP"
						inputType="text"
						placeholder="Código ERP"
						// errorMessage="Campo Obrigatório"
						value={codigoERP}
						// error={codigoERPError}
						name="codigoERP"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCodigoERP(e.target.value)
							// setCodigoERPError(false);
						}}
					/>
					<Input
						label="Código Matriz/Filial"
						inputType="text"
						placeholder="Código Matriz/Filial"
						errorMessage="Campo Obrigatório"
						value={codigoMatrizFilial}
						error={codigoERPError}
						name="codigoMatrizFilial"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCodigoMatrizFilial(e.target.value)
							setCodigoMatrizFilialError(false)
						}}
					/>

					<ContainerSelect>
						<LabelStyled htmlFor="section">Tipo de Seção</LabelStyled>
						<SelectStyled
							id="section"
							name="section"
							value={tipoSecaoId}
							onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
								setTipoSecaoId(e.target.value)
								setTipoError(false)
							}}
						>
							<OptionStyled value="">Selecione o tipo</OptionStyled>
							{sections.map((p: Section) => (
								<OptionStyled key={p.id} value={p.id}>
									{p.descricao}
								</OptionStyled>
							))}
						</SelectStyled>
					</ContainerSelect>
					<ContainerButtons>
						<Button
							type="button"
							className="voltar button1"
							onClickFunc={() => goBack("/secoes")}
						>
							Voltar
						</Button>
						<Button
							type="button"
							className="button2"
							onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
								handleSubmit(e)
							}
						>
							Gravar
						</Button>
					</ContainerButtons>
				</FormStyled>
			</Container>
		</>
	)
}

export default SecitonForm
