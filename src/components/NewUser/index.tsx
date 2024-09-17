import { UserForm } from "@/components/NewUser/UserForm"
import { Drawer } from "antd"
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
		<Drawer
			title="Novo Usuário"
			placement="right"
			onClose={handleCancel}
			open={isOpen}
			width={600}
		>
			<UserForm
				usuario={null}
				usuarioId={""}
				onCancel={handleCancel}
				className="modal"
			/>
		</Drawer>
	)
}

export default NewUser
