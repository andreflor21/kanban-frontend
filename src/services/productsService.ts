import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import { useQuery } from "@tanstack/react-query"

type GenericEntity = {
	id: string
	description: string
}

type ProductSupplier = {
	supplier: {
		id: string
		name: string
	}
	supplierProductCode: string
	leadTime: string
	stockLeadTime: number
	buyUnit: {
		id: string
		description: string
		abrev: string
	}
	minQty: number
	buyQty: number
}

export type ProductType = {
	id: string
	code: string
	description: string
	additionalDescription: string
	stockUnit: string
	productType?: GenericEntity
	productGroup?: GenericEntity
	suppliers: ProductSupplier[]
}

type ProductResponse = {
	products: ProductType[]
}

type ProductBody = {
	code: string
	description: string
	additionalDescription?: string
	stockUnit: string
	ERPCode?: string
	productType: string
	productGroup?: string
}

export const useGetProducts = () => {
	const url = "/products"
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const query = useQuery({
		queryKey: [url],
		queryFn: () => ApiInstance.get<ProductResponse>(url, { headers }),
		enabled: !!token,
	})

	return {
		data: query.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}

export const useGetProductsActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createProduct = async (data: ProductBody) => {
		const url = "/products/new"
		return await ApiInstance.post<ProductBody, ProductType>(url, data, {
			headers,
		})
	}

	const deleteProduct = async (id: string) => {
		const url = `/products/${id}/delete`
		return await ApiInstance.delete(url, {
			headers,
		})
	}

	return {
		createProduct,
		deleteProduct,
	}
}
