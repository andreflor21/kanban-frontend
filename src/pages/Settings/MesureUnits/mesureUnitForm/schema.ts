import * as yup from "yup"

export const mesureUnitSchema = yup.object().shape({
	description: yup.string(),
	abrev: yup.string().required("Campo obrigatório"),
})

export type MesureUnitSchemaType = yup.InferType<typeof mesureUnitSchema>

export const EMPTY_MESURE_UNIT: MesureUnitSchemaType = {
	description: "",
	abrev: "",
}
