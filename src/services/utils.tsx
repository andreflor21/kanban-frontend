import type { MenuProps } from "antd"

export type MenuItem = Required<MenuProps>["items"][number]

function getItem(
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

const makeApiHeaders = (token: string | null | undefined) => {
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
}

export { getItem, makeApiHeaders }
