import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const DEFAULT_PAGE_SIZE = "10"
const DEFAULT_PAGE = "1"

export const useHandlePagination = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const currentPage = searchParams.get("page")
	const pageSize = searchParams.get("page_size")

	const handlePagination = (page: number, pageSize: number) => {
		setSearchParams((params) => {
			params.set("page", page.toString())
			params.set("page_size", pageSize.toString())
			return params
		})
	}

	const handleChangePageSize = (pageSize: number) => {
		setSearchParams((params) => {
			params.set("page_size", pageSize.toString())
			return params
		})
	}

	useEffect(() => {
		if (!currentPage || !pageSize) {
			setSearchParams((params) => {
				params.set("page", DEFAULT_PAGE)
				params.set("page_size", DEFAULT_PAGE_SIZE)
				return params
			})
		}
	}, [currentPage, pageSize, setSearchParams])

	return {
		currentPage,
		pageSize,
		handlePagination,
		handleChangePageSize,
	}
}
