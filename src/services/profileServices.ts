import { useHandlePagination } from "@/hooks/useHandlePagination"
import { ApiInstance } from "@/services/api"
import type { Route } from "@/services/routesServices"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import type { PaginatedResponse } from "@/types/rota"
import type { User } from "@/types/usuario"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export type ProfileType = {
	description: string
	id: string
	routes: Route[]
	users: Array<Pick<User, "id" | "name" | "email">>
}

type UseGetProfilesData = {
	profiles: ProfileType[]
}
type CreateProfileBody = {
	description: string
	users: Array<string>
	routes: Array<string>
}

export const useGetProfilesActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createProfile = async (data: CreateProfileBody) => {
		return await ApiInstance.post<CreateProfileBody, ProfileType>(
			"/profiles/new",
			data,
			{
				headers,
			},
		)
	}

	const deleteProfile = async (id: string) => {
		return await ApiInstance.delete(`/profiles/${id}/delete`, { headers })
	}

	const updateProfile = async (
		id: string,
		data: Partial<CreateProfileBody>,
	) => {
		return await ApiInstance.patch<Partial<CreateProfileBody>, ProfileType>(
			`/profiles/${id}/edit`,
			data,
			{
				headers,
			},
		)
	}

	const duplicateProfile = async (
		id: string,
		data: Partial<CreateProfileBody>,
	) => {
		return await ApiInstance.post<Partial<CreateProfileBody>, ProfileType>(
			`/profiles/${id}/duplicate`,
			data,
			{
				headers,
			},
		)
	}

	return { createProfile, deleteProfile, updateProfile, duplicateProfile }
}

export const useGetProfiles = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)
	const { currentPage, pageSize } = useHandlePagination()
	const url = `/profiles?page=${currentPage}&pageSize=${pageSize}`

	const query = useQuery({
		queryKey: ["profiles", url],
		queryFn: () =>
			ApiInstance.get<PaginatedResponse<UseGetProfilesData>>(url, { headers }),
		enabled: !!token && !!currentPage && !!pageSize,
		placeholderData: keepPreviousData,
	})

	return {
		data: query.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}
