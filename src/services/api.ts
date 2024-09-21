import axios, { type AxiosError } from "axios"
import type { ValidationError } from "yup"

const api = axios.create({
	baseURL: "http://localhost:3000/",
})

type BffApiOptions = {
	headers?: Record<string, string>
	responseType?: "json" | "blob"
}

const handleUnauthorized = (error: AxiosError) => {
	if (error.response?.status === 401) {
		window.location.href = "/login"
	}
}
api.interceptors.response.use(
	(response) => response,
	(error) => {
		handleUnauthorized(error)
		return Promise.reject(error)
	},
)

export const ApiInstance = {
	get: async <R>(uri: string, options?: BffApiOptions) =>
		await api.get<R>(uri, options).then((res) => res.data),
	post: async <D, R>(uri: string, data: D, options?: BffApiOptions) =>
		await api.post<R>(uri, data, options).then((res) => res.data),
	delete: async <R>(uri: string, options?: BffApiOptions) =>
		await api.delete<R>(uri, options).then((res) => res.data),
	patch: async <D, R>(uri: string, data: D, options?: BffApiOptions) =>
		await api.patch<R>(uri, data, options).then((res) => res.data),
	put: async <D, R>(uri: string, data: D, options?: BffApiOptions) =>
		await api.put<R>(uri, data, options).then((res) => res.data),
}

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
