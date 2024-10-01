import * as yup from "yup"

export const productSchema = yup.object().shape({
	code: yup.string().required("Campo obrigatório"),
	description: yup.string().required("Campo obrigatório"),
	additionalDescription: yup.string().optional(),
	stockUnit: yup.string().required("Campo obrigatório"),
	ERPCode: yup.string().optional(),
	productType: yup.string().required("Campo obrigatório"),
	productGroup: yup.string().optional(),
})

export type ProductsSchemaType = yup.InferType<typeof productSchema>

export const EMPTY_PRODUCTS: ProductsSchemaType = {
	code: "",
	description: "",
	additionalDescription: undefined,
	stockUnit: "",
	ERPCode: undefined,
	productType: "",
	productGroup: undefined,
}
