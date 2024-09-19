import imgForgotPassword from "@/assets/forgot_password.svg"
import Logo from "@/assets/logo.svg"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { useGetUsersActions } from "@/services/userServices"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import * as yup from "yup"
import {
	Container,
	ContainerForm,
	ContainerLogo,
	FormStyled,
	ImgStyled,
	InnerWrapper,
	LogoStyled,
	TextStyled,
	Title,
	Wrapper,
} from "./styles"

const newPasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Campo obrigatório")
		.min(6, "Mínimo 6 caracteres"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Senhas diferentes")
		.required("Campo obrigatório"),
})

export type ResetPasswordData = yup.InferType<typeof newPasswordSchema>

const ResetPassword = () => {
	const { token } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const isNewUser = searchParams.get("type") === "new-user"
	const { resetPassword } = useGetUsersActions()
	const { showNotification } = useGetNotification()
	const [isLoading, setIsLoading] = useState(false)
	// const [load, setLoad] = useState<boolean>(false)

	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ResetPasswordData>({
		resolver: yupResolver(newPasswordSchema),
		mode: "all",
	})
	console.log(token, isNewUser)

	const handleUpdateNewUser = async (data: ResetPasswordData) => {
		if (!token) return
		setIsLoading(true)
		try {
			await resetPassword(token, data)
			showNotification({
				message: "Senha atualizada com sucesso",
				description: "",
				type: "SUCCESS",
			})
			setIsLoading(false)
			navigate("/login")
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				message: "Erro ao atualizar senha",
				description: parsedError ?? "Por favor, tente novamente",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const onSubmit = (data: ResetPasswordData) => {
		if (token) {
			// resetPassword()
		}
	}
	return (
		<>
			<Container>
				<Wrapper>
					<ContainerLogo>
						<LogoStyled src={Logo} />
						<Title>Kanban</Title>
					</ContainerLogo>
					<InnerWrapper>
						<ImgStyled src={imgForgotPassword} />
					</InnerWrapper>
				</Wrapper>
				<ContainerForm>
					<TextStyled>Redefinir senha</TextStyled>
					<FormStyled
						onSubmit={handleSubmit(isNewUser ? handleUpdateNewUser : onSubmit)}
					>
						<Input
							inputType="password"
							label="Nova senha"
							placeholder="Digite sua senha"
							{...register("password")}
							error={!!errors.password}
							errorMessage={errors.password?.message}
						/>
						<Input
							inputType="password"
							label="Confirmar Senha"
							placeholder="Redigite sua senha"
							{...register("confirmPassword")}
							error={!!errors.confirmPassword}
							errorMessage={errors.confirmPassword?.message}
						/>

						<Button
							htmlType="submit"
							isLoading={isLoading}
							disabled={isLoading || !isValid}
						>
							Redefinir senha
						</Button>
					</FormStyled>
				</ContainerForm>
			</Container>
		</>
	)
}

export default ResetPassword
