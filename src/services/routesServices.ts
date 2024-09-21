import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

export type Route = {
	id: string
	description: string
	path: string
	method: "GET" | "POST" | "PUT" | "DELETE"
}

export function useGetRoutes() {
	const url = "/routes"
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const query = useQuery({
		queryKey: [url],
		queryFn: () =>
			ApiInstance.get<{
				routes: Route[]
			}>(url, { headers }),
		enabled: !!token,
	})
	const { data, isLoading, error } = query

	return {
		data: data?.routes,
		isLoading,
		error,
		query,
	}
}
