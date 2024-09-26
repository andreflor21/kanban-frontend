import {
	type ErrorExtended,
	UNEXPECTED_ERROR,
	parseError,
} from "@/services/api"
import { type LoginBody, userLogin } from "@/services/userServices"
import type { User } from "@/types/usuario"
import { create } from "zustand"

type UserStore = {
	user: User | undefined
	token: string | undefined
	setUser: (user: User | undefined) => void
	userLogin: (data: LoginBody) => Promise<Error | User>
	setToken: (token: string) => void
	logout: () => void
}
export type DecodedToken = {
	sing: {
		id: string
		profile: string
	}
	id: string
	iat: string
	exp: number
}

const makeLogin = async (data: LoginBody) => {
	try {
		const response = await userLogin(data)
		if (response.token) {
			localStorage.setItem("@kanban/token", response.token)
			useUserStore.setState({
				token: response.token,
				user: response.user,
			})
			return response.user
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
	setUser: (user) => set(() => ({ user })),
	userLogin: (data) => makeLogin(data),
	setToken: (token) => set(() => ({ token })),
	logout: () =>
		set(() => {
			localStorage.removeItem("@kanban/token")
			return { user: undefined, token: undefined }
		}),
}))
