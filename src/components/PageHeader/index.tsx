import { Input } from "antd"
import { debounce } from "lodash"
import type React from "react"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

type PageHeaderProps = {
	showSearch?: boolean
	placeholder?: string
	searchQuery: string
	rightContent?: React.ReactNode
}

export const PageHeader = ({
	showSearch = true,
	searchQuery = "search",
	placeholder = "Pesquisar",
	rightContent = <></>,
}: PageHeaderProps) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const currentSearch = searchParams.get(searchQuery) ?? ""
	const [localSearch, setLocalSearch] = useState(currentSearch)

	const debounceSearchValue = useMemo(
		() =>
			debounce((value: string) => {
				setSearchParams((params) => {
					if (!value.length) params.delete(searchQuery)
					if (value.length) params.set(searchQuery, value)
					return params
				})
			}, 300),
		[setSearchParams, searchQuery],
	)

	const handleChange = (value: string) => {
		setLocalSearch(value)
		debounceSearchValue(value)
	}

	return (
		<S.Container>
			<Input
				placeholder={placeholder}
				allowClear
				value={localSearch}
				onChange={(e) => handleChange(e.target.value)}
			/>
			{rightContent && <div>{rightContent}</div>}
		</S.Container>
	)
}
