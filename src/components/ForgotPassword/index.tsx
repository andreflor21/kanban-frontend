import Button from "@/components/Button"
import Input from "@/components/Input"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { handleForgotPassword } from "@/services/userServices"
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "antd"
import type React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { ButtonStyled, FormStyled } from "./styles"

interface ForgotPasswordProps {
	children: React.ReactNode
}

const schema = yup.object().shape({
	email: yup.string().required("Campo obrigatório"),
})

type FormValues = yup.InferType<typeof schema>

export const ForgotPassword = ({ children }: ForgotPasswordProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const { showNotification } = useGetNotification()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleReset = () => {
		setIsModalOpen(false)
		setIsLoading(false)
	}

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true)

		try {
			const res = await handleForgotPassword(data.email)
			console.log(res)
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			const errorMessage = parsedError ?? "Erro ao recuperar senha"
			showNotification({
				message: "Erro",
				description: errorMessage,
				type: "ERROR",
			})
		} finally {
			handleReset()
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		mode: "onChange",
	})

	console.log(watch("email"))

	return (
		<>
			<ButtonStyled type="button" onClick={showModal}>
				{children}
			</ButtonStyled>
			<Modal
				title="Esqueci minha senha"
				open={isModalOpen}
				onCancel={handleReset}
				footer={false}
			>
				<FormStyled onSubmit={handleSubmit(onSubmit)}>
					<Input
						inputType="email"
						label="Email"
						{...register("email")}
						placeholder="Digite seu email"
						error={!!errors.email}
						errorMessage={errors.email?.message}
					/>
					<Button type="submit" disabled={!isValid} isLoading={isLoading}>
						Recuperar senha
					</Button>
				</FormStyled>
			</Modal>
		</>
	)
}
