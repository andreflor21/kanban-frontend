import {useProfile} from "@/providers/Profile"
import {useUsers} from "@/providers/User"
import type {Perfil} from "@/types/perfil"
import type {User, UsuarioData} from "@/types/usuario"
import {LoadingOutlined} from "@ant-design/icons"
import {Spin} from "antd"
import {type Dispatch, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import * as yup from "yup"
import api from "../../services/api"
import Button from "../Button"
import ChangePassword from "../ChangePassword"
import {Checkbox} from "../Checkbox"
import Input from "../Input"
import {ContainerButtons, ContainerSelect, FormStyled, LabelStyled, OptionStyled, SelectStyled,} from "./styles"

interface UserFormProps {
	usuario: User | null
	usuarioId: string
	novoUsuario: boolean
	setNewUserModal: Dispatch<boolean>
	className?: string
}

export const UserForm = ({
	usuarioId,
	novoUsuario = false,
	setNewUserModal = () => {},
	className,
}: UserFormProps) => {
	const { editUser, newUser, idUser, token } = useUsers()
	const navigate = useNavigate()
	const [readOnly] = useState(
		idUser !== Number.parseInt(usuarioId) && usuarioId !== "",
	)
	const { profiles } = useProfile()
	const [load, setLoad] = useState(true)
	const [nome, setNome] = useState<string | undefined>("")
	const [email, setEmail] = useState<string | undefined>("")
	const [codigo, setCodigo] = useState<string | undefined>("")
	const [ativo, setAtivo] = useState<boolean | undefined>(false)
	const [cpf, setCpf] = useState<string | undefined>("")
	const [dtNascimento, setDtNascimento] = useState<string | undefined>("")
	const [perfil, setProfile] = useState<number | string | undefined>("")
	const [nomeError, setNomeError] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [codigoError, setCodigoError] = useState(false)
	const [cpfError, setCpfError] = useState(false)
	const [dtNascimentoError, setDtNascimentoError] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	useEffect(() => {
		if (usuarioId) {
			api
				.get(`usuarios/${usuarioId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// console.info(response.data);
					setNome(response.data.nome)
					setEmail(response.data.email)
					setCodigo(response.data?.codigo)
					setAtivo(response.data.ativo)
					setCpf(response.data?.cpf)
					setDtNascimento(response.data?.dtNascimento)
					setProfile(response.data.perfil.id)
				})
				.then(() => setLoad(!load))
				.catch((err) => {
					console.error(err)
				})
		}
	}, [usuarioId, load, token])

	// console.log(nome, email, codigo, ativo, cpf, dtNascimento, perfil);

	const cpfMask = (cpf: string) => {
		if (cpf.length === 14) {
			setCpf(cpf.replace("(\\d{3})(\\d{3})(\\d{3})(\\d{2})", "$1.$2.$3-$4"))
		} else {
			setCpf(cpf)
		}
	}
	const goBack = (path: string) => {
		navigate(path)
	}
	const handleSubmit = async (e: React.MouseEvent) => {
		e.preventDefault()

		const updateObject: Omit<UsuarioData, "id"> = {
			nome,
			email,
			codigo,
			ativo,
			cpf,
			dtNascimento: dtNascimento,
			perfil: perfil,
		}

		const schema = yup.object().shape({
			nome: yup.string(),
			email: yup.string(),
			codigo: yup.string(),
			ativo: yup.boolean(),
			cpf: yup.string(),
			dtNascimento: yup.string(),
			perfil: yup.number(),
		})

		await schema
			.validate({ ...updateObject })
			.then((v) => {
				if (novoUsuario) {
					newUser(v, setLoad, navigate)
					setNewUserModal(false)
				} else {
					console.log(v)
					editUser(v)
				}
			})
			.catch(() => {
				nome === "" && setNomeError(true)
				email === "" && setEmailError(true)
				codigo === "" && setCodigoError(true)
				cpf === "" && setCpfError(true)
				dtNascimento === undefined && setDtNascimentoError(true)
			})
	}

	return load && !novoUsuario ? (
		<Spin
			size="large"
			style={{ margin: "5rem 12rem", color: "#34d399" }}
			indicator={<LoadingOutlined spin />}
		/>
	) : (
		<>
			<FormStyled className={className}>
				<Input
					label="Nome"
					inputType="text"
					placeholder="Digite seu nome"
					errorMessage="Campo Obrigatório"
					value={nome}
					error={nomeError}
					name="nome"
					disabled={readOnly}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setNome(e.target.value)
						setNomeError(false)
					}}
				/>
				<Input
					label="Email"
					inputType="text"
					placeholder="Digite seu email"
					errorMessage="Campo Obrigatório"
					value={email}
					error={emailError}
					name="email"
					disabled={readOnly}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setEmail(e.target.value)
						setEmailError(false)
					}}
				/>
				<Input
					label="CPF"
					inputType="text"
					placeholder="000.000.000-00"
					errorMessage="Campo Obrigatório"
					data-mask="000.000.000-00"
					value={cpf}
					error={cpfError}
					disabled={readOnly}
					name="cpf"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						cpfMask(e.target.value)
						setCpfError(false)
					}}
				/>
				<Input
					label="Código"
					inputType="text"
					placeholder="XXXXX"
					errorMessage="Campo Obrigatório"
					value={codigo}
					error={codigoError}
					name="codigo"
					disabled={readOnly}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setCodigo(e.target.value)
						setCodigoError(false)
					}}
				/>
				<Input
					label="Data de Nascimento"
					inputType="date"
					placeholder="DD/MM/YYYY"
					errorMessage="Campo Obrigatório"
					value={dtNascimento?.split("T")[0]}
					error={dtNascimentoError}
					name="dtNascimento"
					disabled={readOnly}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setDtNascimento(e.target.value)
						setDtNascimentoError(false)
					}}
				/>
				<Checkbox
					label="Ativo"
					name="ativo"
					checked={ativo}
					disabled={readOnly}
					onCheckedChange={(checked) => {
						if (checked === true) {
							setAtivo(true)
						} else {
							setAtivo(false)
						}
					}}
				/>
				<ContainerSelect className={readOnly ? "disabled" : ""}>
					<LabelStyled htmlFor="perfil">Perfil</LabelStyled>
					<SelectStyled
						id="perfil"
						name="perfil"
						value={perfil}
						disabled={readOnly}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
							setProfile(e.target.value)
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
				<ContainerButtons>
					{!novoUsuario ? (
						<>
							<Button
								className="button1"
								type="button"
								onClickFunc={() => goBack("/configuracoes/usuarios")}
							>
								Voltar
							</Button>
							<Button
								className="button2"
								type="button"
								disabled={readOnly}
								onClickFunc={() => setIsModalOpen(!isModalOpen)}
							>
								Trocar Senha
							</Button>
							<Button
								className="button3"
								type="button"
								disabled={readOnly}
								onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
									handleSubmit(e)
								}
							>
								Atualizar
							</Button>
						</>
					) : (
						<>
							<Button
								className="button1"
								type="button"
								onClickFunc={() => setNewUserModal(false)}
							>
								Cancelar
							</Button>
							<Button
								className="button2"
								type="button"
								onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
									handleSubmit(e)
								}
							>
								Gravar
							</Button>
						</>
					)}
				</ContainerButtons>
			</FormStyled>
			<ChangePassword
				idUser={Number.parseInt(usuarioId)}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	)
}
