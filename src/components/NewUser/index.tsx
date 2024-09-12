import { UserForm } from "@/components/NewUser/UserForm"
import { Modal } from "antd"
import React from "react"
import { useSearchParams } from "react-router-dom"

const NewUser = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const isOpen = searchParams.get("action") === "create_user"

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			return params
		})
	}

	return (
		<Modal
			title="Novo Usuário"
			open={isOpen}
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
