import { UserForm } from "@/components/NewUser/UserForm"
import { Button, Drawer } from "antd"
import { X } from "phosphor-react"
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
			closable={false}
			onClose={handleCancel}
			open={isOpen}
			width={600}
			extra={<Button shape="circle" onClick={handleCancel} icon={<X />} />}
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
