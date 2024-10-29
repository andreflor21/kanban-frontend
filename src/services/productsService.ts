import { useHandlePagination } from "@/hooks/useHandlePagination"
import { ApiInstance } from "@/services/api"
import { makeApiHeaders } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import type { PaginatedResponse } from "@/types/rota"
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
	stockUnit: {
		id: string
		abrev: string
	}
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
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)
	const { currentPage, pageSize } = useHandlePagination()
	const url = `/products?page=${currentPage}&pageSize=${pageSize}`

	const query = useQuery({
		queryKey: [url],
		queryFn: () =>
			ApiInstance.get<PaginatedResponse<ProductResponse>>(url, { headers }),
		enabled: !!token && !!currentPage && !!pageSize,
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

	const updateProduct = async (id: string, data: Partial<ProductBody>) => {
		const url = `/products/${id}/update`
		return await ApiInstance.patch<Partial<ProductBody>, ProductType>(
			url,
			data,
			{
				headers,
			},
		)
	}

	return {
		createProduct,
		deleteProduct,
		updateProduct,
	}
}

type ProductsTypesResponse = {
	productTypes: GenericEntity[]
}

export const useGetProductsTypes = () => {
	const url = "/products/types"
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const query = useQuery({
		queryKey: [url],
		queryFn: () => ApiInstance.get<ProductsTypesResponse>(url, { headers }),
		enabled: !!token,
	})

	return {
		data: query.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}

export const useGetProductsTypesActions = () => {
	const token = useUserStore((state) => state.token)
	const headers = makeApiHeaders(token)

	const createProductType = async (data: {
		description: string
	}) => {
		const url = "/products/types/new"
		return await ApiInstance.post<
			{
				description: string
			},
			GenericEntity
		>(url, data, {
			headers,
		})
	}

	const deleteProductType = async (id: string) => {
		const url = `/products/types/${id}/delete`
		return await ApiInstance.delete(url, {
			headers,
		})
	}

	const updateProductType = async (
		id: string,
		data: Partial<GenericEntity>,
	) => {
		const url = `/products/types/${id}/update`
		return await ApiInstance.patch<Partial<GenericEntity>, GenericEntity>(
			url,
			data,
			{
				headers,
			},
		)
	}

	return {
		createProductType,
		deleteProductType,
		updateProductType,
	}
}
