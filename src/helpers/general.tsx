import type { DecodedToken } from "@/stores/User/useUserStore"
import { jwtDecode } from "jwt-decode"

export function cpfMask(cpf: string) {
	if (!cpf?.length) return ""
	let v = cpf
	v = v.replace(/\D/g, "")
	v = v.replace(/(\d{3})(\d)/, "$1.$2")
	v = v.replace(/(\d{3})(\d)/, "$1.$2")

	return v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export function cnpjMask(cnpj: string) {
	let v = cnpj.replace(/\D/g, "")
	v = v.replace(/^(\d{2})(\d)/, "$1.$2")
	v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
	v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")
	v = v.replace(/(\d{4})(\d)/, "$1-$2")
	return v
}

export function cepMask(cep: string) {
	return cep
		.replace(/\D/g, "")
		.replace(/(\d{5})(\d)/, "$1-$2")
		.replace(/(-\d{3})\d+?$/, "$1")
}

export function onlyNumbersCep(cep: string) {
	return cep.replace(/\D/g, "")
}

export function onlyNumbersCnpj(cnpj: string) {
	return cnpj.replace(/\D/g, "")
}

export function onlyNumbersCpf(cpf: string) {
	return cpf.replace(/\D/g, "")
}

export function isValidCPF(value: string) {
	let cpf = value
	cpf = cpf.replace(/[^\d]+/g, "")
	if (!cpf?.length) return false
	if (
		cpf.length !== 11 ||
		cpf === "00000000000" ||
		cpf === "11111111111" ||
		cpf === "22222222222" ||
		cpf === "33333333333" ||
		cpf === "44444444444" ||
		cpf === "55555555555" ||
		cpf === "66666666666" ||
		cpf === "77777777777" ||
		cpf === "88888888888" ||
		cpf === "99999999999"
	)
		return false
	let add = 0
	for (let i = 0; i < 9; i++) add += Number.parseInt(cpf.charAt(i)) * (10 - i)
	let rev = 11 - (add % 11)
	if (rev === 10 || rev === 11) rev = 0
	if (rev !== Number.parseInt(cpf.charAt(9))) return false
	add = 0
	for (let i = 0; i < 10; i++) add += Number.parseInt(cpf.charAt(i)) * (11 - i)
	rev = 11 - (add % 11)
	if (rev === 10 || rev === 11) rev = 0
	return rev === Number.parseInt(cpf.charAt(10))
}

export function hashCPF(cpf: string) {
	return `${cpf.replace(/\D/g, "").substring(0, 3)}.****-${cpf.replace(/\D/g, "").substring(9, 11)}`
}

export function isValidToken(token: string) {
	const decodedToken: DecodedToken = jwtDecode(token)
	const currentDate = new Date()
	return new Date(decodedToken.exp * 1000) > currentDate
}

export const getTextValue = (value: string | undefined) => {
	if (!value?.length) return <i>Não informado</i>
	return value
}

export const isValidCEP = (cep: string) => {
	if (!cep?.length) return false
	return cep.length === 8
}
