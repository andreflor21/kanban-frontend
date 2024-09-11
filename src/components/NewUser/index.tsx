import { UserForm } from "@/components/NewUser/UserForm"
import { Modal } from "antd"
import React, { type Dispatch } from "react"

interface NewUserProps {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
}

// import { Container } from './styles';
const NewUser = ({ isModalOpen, setIsModalOpen }: NewUserProps) => {
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	return (
		<Modal
			title="Novo Usuário"
			open={isModalOpen}
			onCancel={handleCancel}
			footer={false}
		>
			<UserForm
				usuario={null}
				usuarioId={""}
				novoUsuario
				setNewUserModal={setIsModalOpen}
				className="modal"
			/>
		</Modal>
	)
}

export default NewUser
