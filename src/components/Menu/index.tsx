import { useGetMenuItems } from "@/components/Menu/useGetMenuItems"
import type { MenuProps } from "antd"
import { MenuAnt } from "./styles"

const Menu = ({ mode, className, items, ...rest }: MenuProps) => {
	const routes = useGetMenuItems()

	return <MenuAnt mode={mode} items={routes} className={className} {...rest} />
}

export default Menu
