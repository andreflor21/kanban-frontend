import { yupResolver } from "@hookform/resolvers/yup"
import { Modal } from "antd"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { useGetUsersActions } from "@/services/userServices"
import React, { type Dispatch } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as yup from "yup"

interface ChangePasswordProps {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
}

// import { Container } from './styles';
const changePasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Campo obrigatório")
		.min(6, "Mínimo 6 caracteres"),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password")], "Senhas diferentes")
		.required("Campo obrigatório"),
})

type ChangePasswordData = yup.InferType<typeof changePasswordSchema>

function ChangePassword({ isModalOpen, setIsModalOpen }: ChangePasswordProps) {
	const { changePassword } = useGetUsersActions()
	const [searchParams] = useSearchParams()
	const userId = searchParams.get("user_edit")
	const { showNotification } = useGetNotification()

	const onSubmit = async (data: ChangePasswordData) => {
		setIsModalOpen(false)
		if (!userId) return

		try {
			await changePassword(userId, {
				password: data.password,
			})
			showNotification({
				message: "Senha alterada com sucesso",
				description: "A senha foi alterada com sucesso",
				type: "SUCCESS",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				message: "Erro ao alterar senha",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		} finally {
			setIsModalOpen(false)
		}
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ChangePasswordData>({
		resolver: yupResolver(changePasswordSchema),
		mode: "all",
	})
	return (
		<Modal
			title="Atualizar Senha"
			open={isModalOpen}
			onCancel={handleCancel}
			footer={
				<Button
					type="primary"
					disabled={!isValid}
					onClick={handleSubmit(onSubmit)}
				>
					Atualizar senha
				</Button>
			}
		>
			<form>
				<Input
					inputType="password"
					label="Nova Senha"
					placeholder="Digite a nova senha"
					{...register("password")}
					error={!!errors.password}
					errorMessage={errors.password?.message}
				/>
				<Input
					inputType="password"
					label="Confirmar Senha"
					placeholder="Confirme a nova senha"
					{...register("confirmPassword")}
					error={!!errors.confirmPassword}
					errorMessage={errors.confirmPassword?.message}
				/>
			</form>
		</Modal>
	)
}

export default ChangePassword
