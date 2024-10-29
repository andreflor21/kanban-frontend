import { useGetMenuItems } from "@/components/Menu/useGetMenuItems"
import type { MenuProps } from "antd"
import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"
import { MenuAnt } from "./styles"

const Menu = ({ mode, className, items, onClick, ...rest }: MenuProps) => {
	const routes = useGetMenuItems()
	const [searchParams, setSearchParams] = useSearchParams()

	const handleClearPageParams = useCallback(() => {
		const page = searchParams.get("page")
		const pageSize = searchParams.get("page_size")
		if (page && pageSize) {
			setSearchParams((params) => {
				params.delete("page")
				params.delete("page_size")
				return params
			})
		}
	}, [searchParams, setSearchParams])

	return (
		<MenuAnt
			mode={mode}
			items={routes}
			className={className}
			{...rest}
			onClick={(e) => {
				handleClearPageParams()
				onClick?.(e)
			}}
		/>
	)
}

export default Menu
