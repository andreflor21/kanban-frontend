import axios, { type AxiosError } from "axios"
import type { ValidationError } from "yup"

const api = axios.create({
	baseURL: "http://localhost:3000/",
})

export default api

export type ErrorExtended = Error | undefined | ValidationError | AxiosError

export type ParseError = (error: ErrorExtended) => string | null

export const parseError: ParseError = (error) => {
	if (!error) return null

	const axiosBody = error?.response?.data?.message
	if (axiosBody) return axiosBody
	const msg = error?.message
	return typeof msg === "string" ? msg : null
}

export const UNEXPECTED_ERROR = "Unexpected error"
