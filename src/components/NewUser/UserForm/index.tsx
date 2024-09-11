import Button from "@/components/Button"
import ChangePassword from "@/components/ChangePassword"
import { Checkbox } from "@/components/Checkbox"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import {
	type UserSchema,
	userSchema,
} from "@/components/NewUser/UserForm/helpers"
import { cpfMask } from "@/helpers/general"
import { useGetProfiles } from "@/services/profileServices"
import { useGetUsersActions } from "@/services/userServices"
import { useUserStore } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { LoadingOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spin } from "antd"
import { type Dispatch, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ContainerButtons, FormStyled } from "./styles"

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
	console.log(novoUsuario)
	const [isLoading, setIsLoading] = useState(false)
	const { createUser } = useGetUsersActions()
	const user = useUserStore((state) => state.user)
	const token = useUserStore((state) => state.token)
	const idUser = user?.id
	const { data: profiles } = useGetProfiles()
	const profileOptions =
		profiles?.profiles?.map((profile) => ({
			value: profile.id,
			label: profile.description,
		})) ?? []

	const editUser = () => {
		console.log("editUser")
	}
	const newUser = () => {
		console.log("newUser")
	}

	const navigate = useNavigate()
	const readOnly = !!usuarioId && idUser !== usuarioId
	// const { profiles } = useProfile()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const initialValues: UserSchema = {
		name: "",
		email: "",
		password: "",
		cpf: "",
		birthdate: "",
		profileId: "",
		active: true,
		code: "",
	}

	const methods = useForm<UserSchema>({
		mode: "onChange",
		resolver: yupResolver(userSchema),
		defaultValues: initialValues,
	})
	// useEffect(() => {
	// 	if (usuarioId) {
	// 		ApiInstance.get<User>(`usuarios/${usuarioId}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		})
	// 			.then((response) => {
	// 				// console.info(response.data);
	// 				setNome(response.name)
	// 				setEmail(response.email)
	// 				// setCodigo(response.id)
	// 				// setAtivo(response.data.ativo)
	// 				// setCpf(response?.cpf)
	// 				// setDtNascimento(response.data?.dtNascimento)
	// 				// setProfile(response.data.perfil.id)
	// 			})
	// 			.then(() => setLoad(!load))
	// 			.catch((err) => {
	// 				console.error(err)
	// 			})
	// 	}
	// }, [usuarioId, load, token])

	// console.log(nome, email, codigo, ativo, cpf, dtNascimento, perfil);

	const goBack = (path: string) => {
		navigate(path)
	}
	// const handleSubmit = async (e: React.MouseEvent) => {
	// 	e.preventDefault()
	//
	// 	const updateObject: Omit<UsuarioData, "id"> = {
	// 		nome,
	// 		email,
	// 		codigo,
	// 		ativo,
	// 		cpf,
	// 		dtNascimento: dtNascimento,
	// 		perfil: perfil,
	// 	}
	//
	// 	const schema = yup.object().shape({
	// 		nome: yup.string(),
	// 		email: yup.string(),
	// 		codigo: yup.string(),
	// 		ativo: yup.boolean(),
	// 		cpf: yup.string(),
	// 		dtNascimento: yup.string(),
	// 		perfil: yup.number(),
	// 	})
	//
	// 	await schema
	// 		.validate({ ...updateObject })
	// 		.then((v) => {
	// 			if (novoUsuario) {
	// 				// newUser(v, setLoad, navigate)
	// 				setNewUserModal(false)
	// 			} else {
	// 				console.log(v)
	// 				// editUser(v)
	// 			}
	// 		})
	// 		.catch(() => {
	// 			nome === "" && setNomeError(true)
	// 			email === "" && setEmailError(true)
	// 			codigo === "" && setCodigoError(true)
	// 			cpf === "" && setCpfError(true)
	// 			dtNascimento === undefined && setDtNascimentoError(true)
	// 		})
	// }
	console.log(methods.watch())

	const handleSubmit = async () => {
		const values = methods.getValues()
		setIsLoading(true)
		try {
			await createUser(values)
			setIsLoading(false)
			setNewUserModal(false)
		} catch (err) {
			console.error(err)
			setIsLoading(false)
		}
	}

	// console.log(profileOptions)

	return isLoading && !novoUsuario ? (
		<Spin
			size="large"
			style={{ margin: "5rem 12rem", color: "#34d399" }}
			indicator={<LoadingOutlined spin />}
		/>
	) : (
		<>
			<FormStyled className={className}>
				<InputSelect
					required
					label="Perfil"
					placeholder="Selecione o perfil"
					options={profileOptions}
					onChange={(value) => {
						methods.setValue("profileId", value)
					}}
				/>
				<Input
					required
					label="Nome"
					placeholder="Digite seu nome"
					errorMessage={methods.formState.errors.name?.message}
					disabled={readOnly}
					{...methods.register("name")}
				/>
				<Input
					required
					label="Email"
					placeholder="Digite seu email"
					errorMessage={methods.formState.errors.email?.message}
					disabled={readOnly}
					{...methods.register("email")}
				/>
				<Input
					type={"text"}
					required
					label="Senha"
					placeholder="Insira uma senha"
					errorMessage={methods.formState.errors.password?.message}
					disabled={readOnly}
					{...methods.register("password")}
				/>
				<Input
					required
					label="CPF"
					type="text"
					placeholder="000.000.000-00"
					errorMessage={methods.formState.errors.cpf?.message}
					disabled={readOnly}
					error={!!methods.formState.errors.cpf}
					onChange={(e) => {
						methods.setValue("cpf", cpfMask(e.target.value))
						methods.trigger("cpf")
					}}
					value={methods.watch("cpf")}
				/>

				<Input
					label="Código"
					inputType="text"
					placeholder="XXXXX"
					errorMessage={methods.formState.errors.code?.message}
					disabled={readOnly}
					{...methods.register("code")}
				/>
				<Input
					label="Data de Nascimento"
					inputType="date"
					placeholder="DD/MM/YYYY"
					errorMessage={methods.formState.errors.birthdate?.message}
					disabled={readOnly}
					{...methods.register("birthdate")}
				/>
				<Checkbox
					label="Ativo"
					checked={methods.watch("active")}
					disabled={readOnly}
					onCheckedChange={(checked) => methods.setValue("active", checked)}
				/>

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
								onClickFunc={handleSubmit}
								disabled={!methods.formState.isValid || isLoading}
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
