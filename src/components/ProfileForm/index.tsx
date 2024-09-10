import type {Perfil} from "@/types/perfil"
import type React from "react"
import {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import * as yup from "yup"
import Button from "../Button"
import Input from "../Input"
import Routes from "../Routes"
import Title from "../Title"
import TitlePage from "../TitlePage"
import {Container, ContainerSelect, FormStyled, LabelStyled, OptionStyled, SelectStyled,} from "./styles"

interface ProfileFormProps {
	profile?: Perfil | null
	profileId?: string
	action: "create" | "duplicate" | "edit"
	className?: string
	title: string
}
interface PerfilData {
	descricao: string
	perfil?: string
}
const ProfileForm = ({
	action,
	profileId,
	className,
	title,
}: ProfileFormProps) => {
	const { perfilId } = useParams()
	const navigate = useNavigate()
	const [perfil, setPerfil] = useState<string>("")
	const [descricaoError, setDescricaoError] = useState<boolean>(false)
	const [, setLoad] = useState(true)
	// const { newProfile, editProfile, profiles, duplicateProfile } = useProfile()
	const profiles = []

	if (!profileId) {
		profileId = perfilId
	}
	const p = profiles.find((p) => p.id === profileId)
	const [descricao, setDescricao] = useState(p?.descricao)

	const goBack = (path: string) => {
		navigate(path)
	}
	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault()

		const updateObject: PerfilData = {
			descricao: descricao as string,
			perfil,
		}

		const schema = yup.object().shape({
			descricao: yup.string().required("Campo Obrigatório"),
			perfil: yup.number(),
		})

		await schema
			.validate({ ...updateObject })
			.then((v) => {
				if (action === "create") {
					newProfile(v, setLoad, navigate)
				} else if (action === "edit" && profileId) {
					editProfile(v, Number.parseInt(profileId))
				} else if (action === "duplicate") {
					console.log(action, v)
					duplicateProfile(v, setLoad, navigate)
				}
			})
			.catch(() => {
				descricao === "" && setDescricaoError(true)
			})
	}
	return (
		<>
			<TitlePage title="Configurações" />
			<Title>{title}</Title>
			<Container>
				<FormStyled className={className}>
					<Input
						label="Descrição"
						inputType="text"
						placeholder="Nome do perfil"
						errorMessage="Campo Obrigatório"
						value={descricao}
						error={descricaoError}
						name="nome"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setDescricao(e.target.value)
							setDescricaoError(false)
						}}
					/>
					{action === "duplicate" ? (
						<ContainerSelect>
							<LabelStyled htmlFor="perfil">Perfil base</LabelStyled>
							<SelectStyled
								id="perfil"
								name="perfil"
								value={perfil}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
									setPerfil(e.target.value)
								}}
							>
								<OptionStyled value="">Selecione o perfil</OptionStyled>
								{profiles.map((p: Perfil) => (
									<OptionStyled key={p.id} value={p.id}>
										{p.descricao}
									</OptionStyled>
								))}
							</SelectStyled>
						</ContainerSelect>
					) : undefined}
					<Button
						type="button"
						onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
							handleSubmit(e)
						}
					>
						Gravar
					</Button>
				</FormStyled>
				{profileId && <Routes profileId={profileId} profile={p} />}
				<Button
					type="button"
					className="voltar"
					onClickFunc={() => goBack("/configuracoes/perfil")}
				>
					Voltar
				</Button>
			</Container>
		</>
	)
}

export default ProfileForm
