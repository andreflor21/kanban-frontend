import type React from "react"
import { ButtonItem } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClickFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
	children: React.ReactNode
	type?: "button" | "submit" | "reset" | undefined
	isLoading?: boolean
	icon?: React.ReactNode
	iconPosition?: "start" | "end"
}

const Button = ({
	onClickFunc,
	type,
	children,
	isLoading = false,
	icon,
	iconPosition = "start",
	...rest
}: ButtonProps) => {
	return (
		<ButtonItem
			icon={icon}
			iconPosition={iconPosition}
			htmlType={type}
			onClick={onClickFunc}
			loading={isLoading}
			{...rest}
		>
			{children}
		</ButtonItem>
	)
}

export default Button
