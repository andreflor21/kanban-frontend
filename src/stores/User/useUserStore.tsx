import {
	type ErrorExtended,
	UNEXPECTED_ERROR,
	parseError,
} from "@/services/api"
import { type LoginBody, getUserData, userLogin } from "@/services/userServices"
import type { User } from "@/types/usuario"
import { create } from "zustand"

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

const makeLogin = async (data: LoginBody) => {
	try {
		const response = await userLogin(data)
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
