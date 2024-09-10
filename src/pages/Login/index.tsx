import imgLogin from "@/assets/img_login_desktop.svg"
import Logo from "@/assets/logo.svg"
import { yupResolver } from "@hookform/resolvers/yup"

import Button from "@/components/Button"
import { ForgotPassword } from "@/components/ForgotPassword"
import Input from "@/components/Input"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { getUserData } from "@/services/userServices"
import { useUserStore } from "@/stores/User/useUserStore"
import { useCallback, useEffect, useState } from "react"
// import React from 'react';
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import {
	Container,
	ContainerForm,
	ContainerLogo,
	FormStyled,
	ImgStyled,
	InnerWrapper,
	ListStyled,
	LogoStyled,
	TextStyled,
	Title,
	Wrapper,
} from "./styles"

const schema = yup.object().shape({
	email: yup.string().required("Campo obrigatório"),
	password: yup
		.string()
		.min(6, "Mínimo de 6 dígitos")
		.required("Campo obrigatório"),
})

type FormValues = yup.InferType<typeof schema>

const Login = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { showNotification } = useGetNotification()
	const userLogin = useUserStore((state) => state.userLogin)
	const setToken = useUserStore((state) => state.setToken)
	const setUser = useUserStore((state) => state.setUser)
	const token = useUserStore((state) => state.token)
	const user = useUserStore((state) => state.user)

	const navigate = useNavigate()

	const localStorageToken = localStorage.getItem("@kanban/token")

	const handleValidateToken = useCallback(async () => {
		if (localStorageToken) {
			const user = await getUserData(localStorageToken)
			setUser(user)
			setToken(localStorageToken)
		}
	}, [localStorageToken, setUser, setToken])

	useEffect(() => {
		if (!token && localStorageToken) {
			handleValidateToken()
		}
	}, [token, localStorageToken, handleValidateToken])

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	})
	if (user) {
		navigate("/dashboard")
		return null
	}

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true)
		try {
			await userLogin(data)
			navigate("/dashboard")
		} catch (error) {
			const parsedError = parseError(error as ErrorExtended)
			showNotification({
				message: parsedError ?? "Falha ao logar",
				description: "Verifique seus dados e tente novamente",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Container>
			<Wrapper>
				<ContainerLogo>
					<LogoStyled src={Logo} />
					<Title>Kanban</Title>
				</ContainerLogo>
				<InnerWrapper>
					<ImgStyled src={imgLogin} />
					<ListStyled>
						<li>Otimizando estoque</li>
						<li>Melhorando pedidos</li>
						<li>Integrando produção</li>
						<li>Agilizando suprimentos</li>
						<li>Unificando operações</li>
					</ListStyled>
				</InnerWrapper>
			</Wrapper>
			<ContainerForm>
				<TextStyled>Login</TextStyled>
				<FormStyled onSubmit={handleSubmit(onSubmit)}>
					<Input
						inputType="email"
						label="Email"
						placeholder="Digite seu email"
						{...register("email")}
						error={!!errors.email}
						errorMessage={errors.email?.message}
					/>
					<Input
						inputType="password"
						label="Senha"
						placeholder="Digite sua senha"
						{...register("password")}
						error={!!errors.password}
						errorMessage={errors.password?.message}
					/>

					<Button type="submit" disabled={!isValid || isLoading}>
						Login
					</Button>
				</FormStyled>
				<ForgotPassword>Esqueci minha senha</ForgotPassword>
			</ContainerForm>
		</Container>
	)
}

export default Login
