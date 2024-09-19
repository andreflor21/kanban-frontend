import { ApiInstance, type ErrorExtended, parseError, UNEXPECTED_ERROR, } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

type SuppliersBody = {
	name: string
	cnpj: string
	legalName: string
	ERPcode: string
	code: string
	email?: string
	fone?: string
	users?: string[]
}
export type Suppliers = {
	ERPcode: string
	active: boolean
	address: {
		addressTypeId: string
		id: string
	}
	cnpj: string
	code: string
	createdAt: string
	email?: string
	fone?: string
	id: string
	legalName: string
	name: string
	users?: string[]
}

type SuppliersResponse = {
	suppliers: Suppliers[]
}

export const useGetSuppliersActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createSupplier = async (data: SuppliersBody) => {
		try {
			return await ApiInstance.post<SuppliersBody, SuppliersBody>(
				"/suppliers/new",
				data,
				{
					headers,
				},
			)
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			throw new Error(parsedError ?? UNEXPECTED_ERROR)
		}
	}

	return { createSupplier }
}

export const useGetSuppliers = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)
	const url = "/suppliers"

	const query = useQuery({
		queryKey: [url],
		queryFn: () => ApiInstance.get<SuppliersResponse>(url, { headers }),
		enabled: !!token,
	})

	const { data, isLoading, error } = query

	return { data, isLoading, error, query }
}
