import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

type SuppliersBody = {
	name: string
	cnpj?: string
	legalName?: string
	ERPCode?: string
	code?: string
	email?: string
	fone?: string
	users?: string[]
}
export type Suppliers = {
	ERPCode: string
	active: boolean
	addresses?: {
		id: string
		lograd?: string
		number?: string
		complement?: string
		district?: string
		city?: string
		state?: string
		zipcode?: string
	}[]
	cnpj: string
	code: string
	createdAt: string
	email?: string
	fone?: string
	id: string
	legalName: string
	name: string
	users?: {
		id: string
		name: string
	}[]
}

type SuppliersResponse = {
	suppliers: Suppliers[]
}

export const useGetSuppliersActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createSupplier = async (data: SuppliersBody) => {
		return await ApiInstance.post<SuppliersBody, SuppliersBody>(
			"/suppliers/new",
			data,
			{
				headers,
			},
		)
	}

	const deleteSupplier = async (id: string) => {
		return await ApiInstance.delete(`suppliers/${id}/delete`, { headers })
	}

	const updateSupplier = async (id: string, data: SuppliersBody) => {
		return await ApiInstance.patch<SuppliersBody, SuppliersBody>(
			`/suppliers/${id}/edit`,
			data,
			{
				headers,
			},
		)
	}

	return { createSupplier, deleteSupplier, updateSupplier }
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
