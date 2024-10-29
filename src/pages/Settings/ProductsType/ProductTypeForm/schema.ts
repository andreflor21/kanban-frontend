import * as yup from "yup"

export const productTypeSchema = yup.object().shape({
	description: yup.string().required("Campo obrigatório"),
	id: yup.string(),
})

export type ProductTypeSchemaType = yup.InferType<typeof productTypeSchema>

export const EMPTY_PRODUCTS_TYPE: ProductTypeSchemaType = {
	description: "",
	id: "",
}
