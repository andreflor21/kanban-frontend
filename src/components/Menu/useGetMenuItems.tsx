import { defaultMenuItems } from "@/components/Menu/consts"
import type { MenuProps } from "antd"
import type React from "react"

export type MenuItem = Required<MenuProps>["items"][number]

export function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group",
	title?: string,
	disabled?: boolean,
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
		title,
		disabled,
	} as MenuItem
}

export const useGetMenuItems = () => {
	const routes: MenuItem[] = []

	routes.push(...defaultMenuItems)

	return routes
}
