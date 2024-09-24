import { defaultMenuItems } from "@/components/Menu/consts"
import { useGetUserData } from "@/services/userServices"
import { type DecodedToken, useUserStore } from "@/stores/User/useUserStore"
import type { MenuProps } from "antd"
import { jwtDecode } from "jwt-decode"

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
	const token = localStorage.getItem("@kanban/token")
	const decodedToken: DecodedToken | undefined = token?.length
		? jwtDecode(token)
		: undefined
	const query = useGetUserData({
		id: decodedToken?.sing?.id,
		token: token,
	})

	const user = useUserStore((state) => state.user)
	const userRoutes = user?.profile?.routes
	const routes: MenuItem[] = []

	// const userPaths = userRoutes.map((route) => route.path)

	routes.push(...defaultMenuItems)

	return routes
}
