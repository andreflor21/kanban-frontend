import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

export const useGetSuppliers = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)
	const url = "/suppliers"

	const query = useQuery({
		queryKey: [url],
		queryFn: () => ApiInstance.get(url, { headers }),
		enabled: !!token,
	})

	const { data, isLoading, error } = query

	return { data, isLoading, error, query }
}
