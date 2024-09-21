import Button from "@/components/Button"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import {
	EMPTY_NEW_PROFILE,
	type ProfileSchemaType,
	profileSchema,
} from "@/pages/Settings/Profile/NewProfile/schema"
import { useGetProfiles } from "@/services/profileServices"
import { useGetAllUsers } from "@/services/userServices"
import { FormFooter, FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Drawer } from "antd"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useParams, useSearchParams } from "react-router-dom"

const NewProfile = () => {
	const { perfilId } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: users } = useGetAllUsers()
	const { data: profiles } = useGetProfiles()

	const isCreatingNew = searchParams.get("action") === "create_profile"
	const editProfileId = searchParams.get("edit_profile_id")
	const currentProfile = profiles?.profiles.find(
		(profile) => profile.id === editProfileId,
	)
	const isEditing = !!editProfileId && !!currentProfile?.id
	const usersToDisplay = users?.users?.map((user) => ({
		label: user.name,
		value: user.id,
	}))

	const initialValues = useMemo(() => {
		if (!isEditing || !currentProfile) {
			return EMPTY_NEW_PROFILE
		}
		return {
			description: currentProfile.description,
			users: currentProfile.users.map((user) => user.id),
		}
	}, [currentProfile, isEditing])

	const onSubmit = () => {
		console.log("onSubmit")
	}
	const methods = useForm<ProfileSchemaType>({
		resolver: yupResolver(profileSchema),
		values: initialValues,
	})

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			return params
		})
		methods.reset()
	}

	return (
		<>
			<Drawer
				width={600}
				title={isCreatingNew ? "Criar Novo Perfil" : "Editar Perfil"}
				open={isCreatingNew || isEditing}
				onClose={() => {
					setSearchParams((params) => {
						params.delete("action")
						params.delete("edit_profile_id")
						return params
					})
				}}
			>
				<FormStyled onSubmit={methods.handleSubmit(onSubmit)}>
					<Input
						label="Nome do Perfil"
						inputType="text"
						placeholder=""
						{...methods.register("description")}
					/>
					<InputSelect
						allowClear
						mode="multiple"
						label="Usuários"
						placeholder="Selecione os usuários"
						value={methods.watch("users")}
						options={usersToDisplay ?? []}
						onChange={(value) => {
							methods.setValue("users", value)
							methods.trigger("users")
						}}
					/>
					<FormFooter>
						<Button className="button1" onClickFunc={handleCancel}>
							Cancelar
						</Button>
						<Button
							className="button2"
							htmlType="submit"
							type="primary"
							disabled={!methods.formState.isValid}
						>
							{/*{isEditing ? "Atualizar" : "Criar"}*/}
							Criar Perfil
						</Button>
					</FormFooter>
				</FormStyled>
			</Drawer>

			{/*{perfilId && (*/}
			{/*	<>*/}
			{/*		<TitlePage title="Configurações" />*/}

			{/*		<ProfileForm*/}
			{/*			profileId={perfilId}*/}
			{/*			title="Informações do Perfil"*/}
			{/*			action="edit"*/}
			{/*		/>*/}
			{/*	</>*/}
			{/*)}*/}
		</>
	)
}

export default NewProfile
