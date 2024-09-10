import {yupResolver} from "@hookform/resolvers/yup"
import {Modal} from "antd"

import Button from "@/components/Button"
import Input from "@/components/Input"
import React, {type Dispatch} from "react"
import {useForm} from "react-hook-form"
import * as yup from "yup"
import {FormStyled} from "./styles"

interface FormValues {
	password: string
	confirmPassword: string
}
interface ChangePasswordProps {
	idUser: number
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
}

// import { Container } from './styles';

function ChangePassword({
	idUser,
	isModalOpen,
	setIsModalOpen,
}: ChangePasswordProps) {
	// const { changePassword } = useUsers()
	const changePassword = (idUser: number, data: FormValues) => {
		console.log(idUser, data)
	}
	const onSubmit = (data: FormValues) => {
		setIsModalOpen(false)
		changePassword(idUser, data)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const schema = yup.object().shape({
		password: yup.string().required("Campo obrigatório"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Senhas diferentes")
			.required("Campo obrigatório"),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	})
	return (
		<Modal
			title="Atualizar Senha"
			open={isModalOpen}
			onCancel={handleCancel}
			footer={false}
		>
			<FormStyled onSubmit={handleSubmit(onSubmit)}>
				<Input
					inputType="password"
					label="Senha"
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
				<Button type="submit">Atualizar senha</Button>
			</FormStyled>
		</Modal>
	)
}

export default ChangePassword
