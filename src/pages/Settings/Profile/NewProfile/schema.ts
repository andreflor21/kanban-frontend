import * as yup from "yup"

export const profileSchema = yup.object().shape({
	description: yup.string().required("Campo Obrigatório"),
	users: yup.array().of(yup.string()),
})

export type ProfileSchemaType = yup.InferType<typeof profileSchema>

export const EMPTY_NEW_PROFILE: ProfileSchemaType = {
	description: "",
	users: [],
}
