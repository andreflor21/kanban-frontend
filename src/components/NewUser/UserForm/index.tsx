import Button from "@/components/Button"
import ChangePassword from "@/components/ChangePassword"
import { Checkbox } from "@/components/Checkbox"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import { type UserSchema, userSchema, } from "@/components/NewUser/UserForm/helpers"
import { cpfMask } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { useGetProfiles } from "@/services/profileServices"
import { useGetAllUsers, useGetUsersActions } from "@/services/userServices"
import { useUserStore } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { LoadingOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { Spin } from "antd"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { ContainerButtons, FormStyled } from "./styles"

interface UserFormProps {
	usuario: User | null
	usuarioId: string
	onCancel: () => void
	className?: string
}

export const UserForm = ({
	usuarioId,
	onCancel,
	className,
	usuario,
}: UserFormProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { createUser, updateUser } = useGetUsersActions()
	const { query } = useGetAllUsers()
	const user = useUserStore((state) => state.user)
	const idUser = user?.id
	const { data: profiles } = useGetProfiles()
	const profileOptions =
		profiles?.profiles?.map((profile) => ({
			value: profile.id,
			label: profile.description,
		})) ?? []

	const { showNotification } = useGetNotification()
	const isEditing = !!usuarioId && idUser === usuarioId

	const [isModalOpen, setIsModalOpen] = useState(false)

	const initialValues: UserSchema = {
		name: usuario?.name ?? "",
		email: usuario?.email ?? "",
		password: "",
		cpf: usuario?.cpf ?? "",
		birthdate: usuario?.birthdate ?? "",
		profileId: usuario?.profileId ?? "",
		active: usuario?.active ?? true,
		code: usuario?.code ?? "",
	}

	const methods = useForm<UserSchema>({
		mode: "onChange",
		resolver: yupResolver(userSchema),
		values: initialValues,
		context: {
			isEditing,
		},
	})

	const handleEdit = async () => {
		const values = methods.getValues()
		setIsLoading(true)
		const body: Partial<UserSchema> = {}
		const keys = Object.keys(values) as (keyof UserSchema)[]

		for (const key of keys) {
			if (key === "active") {
				body[key] = values[key]
				continue
			}
			if (values[key]) {
				body[key] = values[key]
			}
		}

		try {
			await updateUser(usuarioId, body)
			await query.refetch()
			showNotification({
				message: "Usuário atualizado com sucesso",
				description: "O usuário foi atualizado com sucesso",
				type: "SUCCESS",
			})
			onCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				message: "Erro ao atualizar usuário",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
			methods.reset()
		}
	}

	const handleSubmit = async () => {
		const values = methods.getValues()
		setIsLoading(true)
		try {
			await createUser(values)
			await query.refetch()
			showNotification({
				message: "Usuário criado com sucesso",
				description: "O usuário foi criado com sucesso",
				type: "SUCCESS",
			})
			onCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				message: "Erro ao criar usuário",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
			methods.reset()
		}
	}

	return isLoading ? (
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
					value={methods.watch("profileId")}
				/>
				<Input
					required
					label="Nome"
					placeholder="Digite seu nome"
					errorMessage={methods.formState.errors.name?.message}
					{...methods.register("name")}
				/>
				<Input
					required
					label="Email"
					placeholder="Digite seu email"
					errorMessage={methods.formState.errors.email?.message}
					{...methods.register("email")}
				/>
				{!isEditing && (
					<Input
						type={"text"}
						required
						label="Senha"
						placeholder="Insira uma senha"
						errorMessage={methods.formState.errors.password?.message}
						{...methods.register("password")}
					/>
				)}
				<Input
					required
					label="CPF"
					type="text"
					placeholder="000.000.000-00"
					errorMessage={methods.formState.errors.cpf?.message}
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
					{...methods.register("code")}
				/>
				<Input
					label="Data de Nascimento"
					inputType="date"
					placeholder="DD/MM/YYYY"
					errorMessage={methods.formState.errors.birthdate?.message}
					{...methods.register("birthdate")}
				/>
				<Checkbox
					label="Ativo"
					checked={methods.watch("active")}
					onCheckedChange={(checked) => methods.setValue("active", !!checked)}
				/>

				<ContainerButtons>
					<>
						<Button className="button1" type="button" onClickFunc={onCancel}>
							Cancelar
						</Button>
						<Button
							className="button2"
							type="button"
							onClickFunc={() => (isEditing ? handleEdit() : handleSubmit())}
							disabled={!methods.formState.isValid || isLoading}
						>
							Salvar
						</Button>
					</>
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
