import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

type SuppliersBody = {
	name: string
	cnpj?: string
	legalName?: string
	ERPcode?: string
	code?: string
	email?: string
	fone?: string
	users?: string[]
}

export type DeliveryDaysType = {
	id: string | number
	days: number
	period: string
	hour: string
}

type DeliveryDaysBody = {
	days: number
	period: string | undefined
	hour: string | undefined
}

export type AddressType = {
	id: string
	lograd?: string
	number?: string
	complement?: string
	district?: string
	city?: string
	state?: string
	zipcode?: string
	addressType?: {
		description?: string
	}
}
export type Suppliers = {
	ERPcode: string
	active: boolean
	addresses?: AddressType[]
	deliveryDays?: DeliveryDaysType[]
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

	const addAddress = async (supplierId: string, data: Partial<AddressType>) => {
		return await ApiInstance.post(
			`/suppliers/${supplierId}/addresses/new`,
			data,
			{
				headers,
			},
		)
	}

	const deleteAddress = async (supplierId: string, addressId: string) => {
		return await ApiInstance.delete(
			`/suppliers/${supplierId}/addresses/${addressId}/delete`,
			{
				headers,
			},
		)
	}

	const editAddress = async (
		supplierId: string,
		addressId: string,
		data: Partial<AddressType>,
	) => {
		return await ApiInstance.patch(
			`/suppliers/${supplierId}/addresses/${addressId}/edit`,
			data,
			{
				headers,
			},
		)
	}

	const addDeliveryDays = async (
		supplierId: string,
		data: DeliveryDaysBody[],
	) => {
		return await ApiInstance.patch(
			`/suppliers/${supplierId}/delivery-days/edit`,
			{
				deliveryDays: data,
			},
			{
				headers,
			},
		)
	}

	return {
		createSupplier,
		deleteSupplier,
		updateSupplier,
		addAddress,
		deleteAddress,
		editAddress,
		addDeliveryDays,
	}
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
