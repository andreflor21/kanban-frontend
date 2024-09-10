import api, {
	type ErrorExtended,
	parseError,
	UNEXPECTED_ERROR,
} from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import type { User } from "@/types/usuario"
import { jwtDecode } from "jwt-decode"
import { create } from "zustand"

type LoginBody = {
	email: string
	password: string
}
type LoginResponse = {
	token: string
}

type UserStore = {
	user: User | undefined
	token: string | undefined
	setUser: (user: User) => void
	userLogin: (data: LoginBody) => Promise<Error | User>
}
export type DecodedToken = {
	sing: {
		id: string
		profile: string
	}
	iat: string
	exp: number
}

const getUserData = async (token: string): Promise<User | undefined> => {
	try {
		const decodedToken: DecodedToken = jwtDecode(token)
		const headers = makeApiHeaders(token)
		const res = await api.get<User>(`/users/${decodedToken.sing.id}`, {
			headers,
		})
		return res.data
	} catch (err) {
		console.log("Erro ao obter o usuário")
		return undefined
	}
}

const makeLogin = async (data: LoginBody) => {
	try {
		const response = await api.post<LoginResponse>("login", data)
		if (response.data.token) {
			localStorage.setItem("@kanban/token", response.data.token)
			const user = await getUserData(response.data.token)
			if (user) {
				useUserStore.setState({ user: user, token: response.data.token })
				return user
			}
			return new Error(UNEXPECTED_ERROR)
		}
	} catch (err) {
		const parsedError = parseError(err as ErrorExtended)
		throw new Error(parsedError ?? UNEXPECTED_ERROR)
	}
	throw new Error(UNEXPECTED_ERROR)
}

export const useUserStore = create<UserStore>((set) => ({
	user: undefined,
	token: undefined,
	setUser: (user: User) => set(() => ({ user })),
	userLogin: (data: LoginBody) => makeLogin(data),
}))
