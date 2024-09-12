import { isValidCPF } from "@/helpers/general"
import * as yup from "yup"

export const userSchema = yup.object().shape({
	name: yup.string().required("Campo Obrigatório"),
	email: yup.string().email().required("Campo Obrigatório"),
	password: yup
		.string()
		.test("isEditing", "Mínimo 6 caracteres", (value, { options }) => {
			const isEditing = !!options?.context?.isEditing
			if (isEditing) {
				return true
			}
			return !!value && value?.length > 6
		}),
	cpf: yup
		.string()
		.required("Campo Obrigatório")
		.test("isValidCPF", "CPF inválido", (value) => {
			const onlyNumbers = value.replace(/[^\d]+/g, "")
			if (onlyNumbers.length === 11) {
				return isValidCPF(value)
			}
			return true
		})
		.test("minLength", "", (value) => {
			const onlyNumbers = value.replace(/[^\d]+/g, "")
			return onlyNumbers.length >= 11
		}),
	profileId: yup.string().required("Campo Obrigatório"),
	active: yup.boolean().required("Campo Obrigatório"),
	birthdate: yup.string(),
	code: yup.string(),
})

export type UserSchema = yup.InferType<typeof userSchema>
