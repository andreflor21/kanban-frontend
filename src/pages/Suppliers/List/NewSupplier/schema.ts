import * as yup from "yup"

export const newSupplierSchema = yup.object({
	name: yup.string().required("Campo obrigatório"),
	cnpj: yup.string(),
	legalName: yup.string(),
	ERPcode: yup.string(),
	code: yup.string(),
	fone: yup.string(),
	email: yup.string(),
	users: yup.array(yup.string().required("Campo obrigatório")),
})

export type NewSupplierSchema = yup.InferType<typeof newSupplierSchema>
