import { isValidToken } from "@/helpers/general"
import {
	ApiInstance,
	type ErrorExtended,
	UNEXPECTED_ERROR,
	parseError,
} from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { useQuery } from "@tanstack/react-query"

export type LoginBody = {
	email: string
	password: string
}
export type LoginResponse = {
	token: string
	user: User
}

export async function userLogin(data: LoginBody) {
	return await ApiInstance.post<LoginBody, LoginResponse>("login", data)
}

export async function handleForgotPassword(email: string) {
	return await ApiInstance.post("forgot-password", { email })
}
type UseGetUserData = {
	id: string | undefined
	token: string | null
}

export const useGetUserData = ({ id, token }: UseGetUserData) => {
	const url = `/users/${id}`
	const isTokenValid = token ? isValidToken(token) : false
	const enabled = !!id && !!token && isTokenValid

	return useQuery<User>({
		queryKey: ["user", id],
		queryFn: () =>
			ApiInstance.get<User>(url, { headers: makeApiHeaders(token) }),
		enabled: enabled,
	})
}

type CreateUserBody = {
	name: string
	email: string
	password?: string
	cpf: string
	code?: string
	profileId: string
	birthdate?: string
	active: boolean
}

export const useGetUsersActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createUser = async (data: CreateUserBody) => {
		try {
			return await ApiInstance.post<CreateUserBody, User>("/users/new", data, {
				headers,
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			throw new Error(parsedError ?? UNEXPECTED_ERROR)
		}
	}

	const deleteUser = async (id: string) => {
		try {
			return await ApiInstance.delete(`/users/${id}/delete`, { headers })
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			throw new Error(parsedError ?? UNEXPECTED_ERROR)
		}
	}

	const updateUser = async (id: string, data: Partial<CreateUserBody>) => {
		const url = `/users/${id}/edit`
		try {
			return await ApiInstance.patch<Partial<CreateUserBody>, User>(url, data, {
				headers,
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			throw new Error(parsedError ?? UNEXPECTED_ERROR)
		}
	}

	return { createUser, deleteUser, updateUser }
}

type UsersResponse = {
	users: User[]
}

export const useGetAllUsers = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)
	const url = "/users"

	const query = useQuery<UsersResponse>({
		queryKey: [url],
		queryFn: () => ApiInstance.get<UsersResponse>(url, { headers }),
		enabled: !!token,
	})

	const { data, isLoading, error } = query

	return { data, isLoading, error, query }
}