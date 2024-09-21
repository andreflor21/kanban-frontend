import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import type { User } from "@/types/usuario"
import { useQuery } from "@tanstack/react-query"

export type ProfileType = {
	description: string
	id: string
	routes: Array<string>
	users: Array<Pick<User, "id" | "name" | "email">>
}

type UseGetProfilesData = {
	profiles: ProfileType[]
}

export const useGetProfiles = () => {
	const url = "/profiles"
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const { data, isLoading, error } = useQuery({
		queryKey: ["profiles", url],
		queryFn: () => ApiInstance.get<UseGetProfilesData>(url, { headers }),
		enabled: !!token,
	})
	console.log(data)

	return { data, isLoading, error }
}
