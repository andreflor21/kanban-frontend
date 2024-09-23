import * as yup from "yup"

export const profileSchema = yup.object().shape({
	description: yup.string().required("Campo Obrigatório"),
	users: yup.array().of(yup.string().required("Campo Obrigatório")),
	routes: yup.array().of(yup.string().required("Campo obrigatório")),
})

export type ProfileSchemaType = yup.InferType<typeof profileSchema>

export const EMPTY_NEW_PROFILE: ProfileSchemaType = {
	description: "",
	users: [],
	routes: [],
}
