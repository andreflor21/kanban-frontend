import * as yup from "yup"

export const profileSchema = yup.object().shape({
	description: yup.string().required("Campo Obrigatório"),
	users: yup.array().of(yup.string()),
	route_ids: yup.array().of(yup.string()).min(1, "Campo Obrigatório"),
})

export type ProfileSchemaType = yup.InferType<typeof profileSchema>

export const EMPTY_NEW_PROFILE: ProfileSchemaType = {
	description: "",
	users: [],
	route_ids: [],
}
