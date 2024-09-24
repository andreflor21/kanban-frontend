import * as yup from "yup"

export const addressSchema = yup.object().shape({
	lograd: yup.string().required("Campo obrigatório"),
	number: yup.string().required("Campo obrigatório"),
	zipcode: yup.string().required("Campo obrigatório"),
	city: yup.string().required("Campo obrigatório"),
	state: yup.string().required("Campo obrigatório"),
	district: yup.string().required("Campo obrigatório"),
	complement: yup.string(),
	addressType: yup.string().required("Campo obrigatório"),
})

export type AddressSchemaType = yup.InferType<typeof addressSchema>

export const EMPTY_ADDRESS: AddressSchemaType = {
	lograd: "",
	number: "",
	zipcode: "",
	city: "",
	state: "",
	district: "",
	complement: "",
	addressType: "",
}
