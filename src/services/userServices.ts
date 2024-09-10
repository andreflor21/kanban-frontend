import {
	ApiInstance,
	type ErrorExtended,
	UNEXPECTED_ERROR,
	parseError,
} from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import type { DecodedToken } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { useQuery } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"

export type LoginBody = {
	email: string
	password: string
}
export type LoginResponse = {
	token: string
}

export async function userLogin(data: LoginBody) {
	return await ApiInstance.post<LoginBody, LoginResponse>("login", data)
}

export async function getUserData(token: string): Promise<User | undefined> {
	try {
		const decodedToken: DecodedToken = jwtDecode(token)
		const headers = makeApiHeaders(token)
		return await ApiInstance.get<User>(`/users/${decodedToken.sing.id}`, {
			headers,
		})
	} catch (err) {
		const parsedError = parseError(err as ErrorExtended)
		throw new Error(parsedError ?? UNEXPECTED_ERROR)
	}
}

export async function handleForgotPassword(email: string) {
	return await ApiInstance.post("forgot-password", { email })
}
type UseGetUserData = {
	id: string | null
	token: string | null
}

export const useGetUserData = ({ id, token }: UseGetUserData) => {
	const url = `/users/${id}`

	return useQuery<User>({
		queryKey: ["user", url],
		queryFn: () =>
			ApiInstance.get<User>(url, { headers: makeApiHeaders(token) }),
		enabled: !!id && !!token,
	})
}
