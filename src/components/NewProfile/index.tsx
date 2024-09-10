import {Modal} from "antd"
import React, {type Dispatch} from "react"
import ProfileForm from "../ProfileForm"

interface NewProfileProps {
	isModalOpen: boolean
	setIsModalOpen: Dispatch<boolean>
	duplicate: boolean
}

// import { Container } from './styles';
const NewProfile = ({
	isModalOpen,
	setIsModalOpen,
	duplicate = false,
}: NewProfileProps) => {
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
			<ProfileForm
				profile={null}
				profileId={""}
				newProfile
				setNewProfileModal={setIsModalOpen}
				className="modal"
			/>
		</Modal>
	)
}

export default NewProfile
