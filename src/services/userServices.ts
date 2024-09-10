import api, {
	type ErrorExtended,
	parseError,
	UNEXPECTED_ERROR,
} from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import type { DecodedToken } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { jwtDecode } from "jwt-decode"

export type LoginBody = {
	email: string
	password: string
}
export type LoginResponse = {
	token: string
}

export async function userLogin(data: LoginBody) {
	return await api.post<LoginResponse>("login", data)
}

export async function getUserData(token: string): Promise<User | undefined> {
	try {
		const decodedToken: DecodedToken = jwtDecode(token)
		const headers = makeApiHeaders(token)
		const res = await api.get<User>(`/users/${decodedToken.sing.id}`, {
			headers,
		})
		return res.data
	} catch (err) {
		const parsedError = parseError(err as ErrorExtended)
		throw new Error(parsedError ?? UNEXPECTED_ERROR)
	}
}

export async function handleForgotPassword(email: string) {
	return await api.post("forgot-password", { email })
}
