import Button from "@/components/Button"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	EMPTY_NEW_PROFILE,
	profileSchema,
	type ProfileSchemaType,
} from "@/pages/Settings/Profile/ProfileForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetProfiles,
	useGetProfilesActions,
} from "@/services/profileServices"
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

const getActionButtonText = (isEditing: boolean, isDuplicating: boolean) => {
	if (isEditing) return "Atualizar Perfil"
	if (isDuplicating) return "Duplicar Perfil"
	return "Criar Perfil"
}

const getTitle = (isEditing: boolean, isDuplicating: boolean) => {
	if (isEditing) return "Editar Perfil"
	if (isDuplicating) return "Duplicar Perfil"
	return "Criar Novo Perfil"
}

const ProfileForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const { data: users } = useGetAllUsers()
	const { data: profiles, query: profilesQuery } = useGetProfiles()
	const { data: routes } = useGetRoutes()
	const { createProfile, updateProfile, duplicateProfile } =
		useGetProfilesActions()
	const { showNotification } = useGetNotification()

	const isCreatingNew = searchParams.get("action") === "create_profile"
	const isDuplicating = searchParams.get("action") === "duplicate_profile"
	const editProfileId = searchParams.get("edit_profile_id")

	const currentProfile = profiles?.profiles.find(
		(profile) => profile.id === editProfileId,
	)
	const isEditing = !!editProfileId && !!currentProfile?.id && !isDuplicating
	const usersToDisplay = users?.users?.map((user) => ({
		label: user.name,
		value: user.id,
	}))

	const initialValues = useMemo(() => {
		if (!currentProfile?.id) {
			return EMPTY_NEW_PROFILE
		}

		return {
			description: isDuplicating ? "" : currentProfile.description,
			users: currentProfile.users.map((user) => user.id),
			routes: currentProfile?.routes.map((route) => route.id) ?? [],
		}
	}, [currentProfile, isDuplicating])

	const onSubmit = async () => {
		const values = methods.getValues()
		const body = {
			description: values.description,
			users: values?.users ?? [],
			routes: isDuplicating ? [] : (values?.routes ?? []),
		}
		try {
			if (isDuplicating && editProfileId) {
				await duplicateProfile(editProfileId, body)
			}
			if (isEditing) {
				await updateProfile(editProfileId, body)
			}
			if (isCreatingNew) {
				await createProfile(body)
			}
			await profilesQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: isEditing
					? "Perfil atualizado com sucesso"
					: "Perfil criado com sucesso",
				description: "",
			})
			setSearchParams((params) => {
				params.delete("action")
				params.delete("edit_profile_id")
				return params
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: isEditing
					? "Erro ao atualizar perfil"
					: "Erro ao criar perfil",
				description: parsedError ?? "Por favor, tente novamente",
			})
		}
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
			methods.setValue("routes", methods.watch("routes")?.concat(routeId))
		} else {
			methods.setValue(
				"routes",
				methods.watch("routes")?.filter((id) => id !== routeId),
			)
		}
		methods.trigger("routes")
	}

	return (
		<>
			<Drawer
				width={600}
				title={getTitle(isEditing, isDuplicating)}
				open={isCreatingNew || isEditing || isDuplicating}
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
									disabled={isDuplicating}
									checked={methods.watch("routes")?.includes(route.id)}
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
							{getActionButtonText(isEditing, isDuplicating)}
						</Button>
					</FormFooter>
				</FormStyled>
			</Drawer>
		</>
	)
}

export default ProfileForm
