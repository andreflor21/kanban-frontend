import Button from "@/components/Button"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import {
	EMPTY_NEW_PROFILE,
	type ProfileSchemaType,
	profileSchema,
} from "@/pages/Settings/Profile/NewProfile/schema"
import { useGetProfiles } from "@/services/profileServices"
import { useGetRoutes } from "@/services/routesServices"
import { useGetAllUsers } from "@/services/userServices"
import { FormFooter, FormStyled } from "@/style/global"
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import { yupResolver } from "@hookform/resolvers/yup"
import { Divider, Drawer, Switch, Typography } from "antd"
import { useMemo } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

const NewProfile = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: users } = useGetAllUsers()
	const { data: profiles } = useGetProfiles()
	const { data: routes } = useGetRoutes()

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
			route_ids: currentProfile?.routes ?? [],
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

	const handleToggleRoute = (checked: boolean, routeId: string) => {
		if (checked) {
			methods.setValue("route_ids", methods.watch("route_ids")?.concat(routeId))
		} else {
			methods.setValue(
				"route_ids",
				methods.watch("route_ids")?.filter((id) => id !== routeId),
			)
		}
		methods.trigger("route_ids")
	}

	console.count("render")

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
					<Divider style={{ margin: "12px 0" }} />
					<S.RoutesWrapper>
						<Typography.Title style={{ margin: 0 }} level={4}>
							Rotas
						</Typography.Title>

						{routes?.map((route) => (
							<S.RouteLine key={route.id}>
								<Typography.Text>{route.description}</Typography.Text>
								<Switch
									checkedChildren={<CheckOutlined />}
									unCheckedChildren={<CloseOutlined />}
									checked={methods.watch("route_ids")?.includes(route.id)}
									onChange={(checked) => {
										handleToggleRoute(checked, route.id)
									}}
								/>
							</S.RouteLine>
						))}
					</S.RoutesWrapper>

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
							{isEditing ? "Atualizar Perfil" : "Criar Perfil"}
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
