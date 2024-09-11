import { UserForm } from "@/components/NewUser/UserForm"
import { Modal } from "antd"
import React, { type Dispatch } from "react"

interface NewUserProps {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
}

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
				onCancel={handleCancel}
				className="modal"
			/>
		</Modal>
	)
}

export default NewUser
