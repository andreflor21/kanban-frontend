import { type ErrorExtended, parseError, UNEXPECTED_ERROR, } from "@/services/api"
import { getUserData, type LoginBody, userLogin } from "@/services/userServices"
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
	iat: string
	exp: number
}

const makeLogin = async (data: LoginBody) => {
	try {
		const response = await userLogin(data)
		if (response.token) {
			localStorage.setItem("@kanban/token", response.token)
			const user = await getUserData(response.token)
			if (user) {
				useUserStore.setState({ user: user, token: response.token })
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
	setUser: (user) => set(() => ({ user })),
	userLogin: (data) => makeLogin(data),
	setToken: (token) => set(() => ({ token })),
	logout: () =>
		set(() => {
			localStorage.removeItem("@kanban/token")
			return { user: undefined, token: undefined }
		}),
}))
