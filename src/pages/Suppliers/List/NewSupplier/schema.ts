import * as yup from "yup"

export const newSupplierSchema = yup.object({
	name: yup.string().required("Campo obrigatório"),
	cnpj: yup.string().required("Campo obrigatório"),
	legalName: yup.string().required("Campo obrigatório"),
	ERPcode: yup.string().required("Campo obrigatório"),
	code: yup.string().required("Campo obrigatório"),
	fone: yup.string(),
	email: yup.string().email("Email inválido"),
	users: yup.array(yup.string().required("Campo obrigatório")),
})

export type NewSupplierSchema = yup.InferType<typeof newSupplierSchema>
