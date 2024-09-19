import Button from "@/components/Button"
import Input from "@/components/Input"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { handleForgotPassword } from "@/services/userServices"
import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "antd"
import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"

interface ForgotPasswordProps {
	children: React.ReactNode
}

const schema = yup.object().shape({
	email: yup.string().required("Campo obrigatório"),
})

type FormValues = yup.InferType<typeof schema>

export const ForgotPassword = ({ children }: ForgotPasswordProps) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isSent, setIsSent] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [closeCountDown, setCloseCountDown] = useState(5)

	const { showNotification } = useGetNotification()

	const showModal = () => {
		setIsModalOpen(true)
	}

	const onSubmit = async (data: FormValues) => {
		setIsLoading(true)

		try {
			await handleForgotPassword(data.email)
			setIsSent(true)
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			const errorMessage = parsedError ?? "Erro ao recuperar senha"
			showNotification({
				message: "Erro",
				description: errorMessage,
				type: "ERROR",
			})
			setIsLoading(false)
		}
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
		mode: "onChange",
	})

	const handleClose = useCallback(() => {
		reset()
		setIsModalOpen(false)
		setIsSent(false)
		setIsLoading(false)
		setCloseCountDown(5)
	}, [reset])

	useEffect(() => {
		if (isSent) {
			const timer = setTimeout(() => {
				setCloseCountDown(closeCountDown - 1)
				if (closeCountDown === 1) {
					handleClose()
				}
			}, 1000)
			return () => clearTimeout(timer)
		}
	}, [closeCountDown, handleClose, isSent])

	return (
		<>
			<Button type={"link"} htmlType="button" onClick={showModal}>
				{children}
			</Button>
			<Modal
				title={isSent ? "Email enviado com sucesso!" : "Esqueci minha senha"}
				open={isModalOpen}
				onCancel={handleClose}
				footer={
					isSent ? (
						<Button
							onClick={handleClose}
							type={"text"}
						>{`Fechar (${closeCountDown})`}</Button>
					) : (
						<Button
							disabled={!isValid}
							isLoading={isLoading}
							type={"primary"}
							onClick={handleSubmit(onSubmit)}
						>
							Recuperar senha
						</Button>
					)
				}
			>
				{isSent ? (
					<div>
						<p>Uma mensagem foi enviada para o email informado</p>
						<p>Por favor, verifique sua caixa de entrada</p>
					</div>
				) : (
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							inputType="email"
							label="Email"
							{...register("email")}
							placeholder="Digite seu email"
							error={!!errors.email}
							errorMessage={errors.email?.message}
						/>
					</form>
				)}
			</Modal>
		</>
	)
}
