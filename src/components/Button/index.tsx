import type { ButtonProps, GetProps } from "antd"
import type React from "react"
import { ButtonItem } from "./styles"

// interface ButtonProps extends GetProps<ButtonProps> {
// 	onClickFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
// 	children: React.ReactNode
// 	type?: "button" | "submit" | "reset" | undefined
// 	isLoading?: boolean
// 	icon?: React.ReactNode
// 	iconPosition?: "start" | "end"
// }

type ButtonPropsType = GetProps<ButtonProps> & {
	onClickFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
	children: React.ReactNode
	htmlType?: "button" | "submit" | "reset" | undefined
	isLoading?: boolean
	icon?: React.ReactNode
	iconPosition?: "start" | "end"
}

const Button = ({
	onClickFunc,
	htmlType = "button",
	children,
	isLoading = false,
	icon,
	iconPosition = "start",
	type = "default",
	...rest
}: ButtonPropsType) => {
	return (
		<ButtonItem
			icon={icon}
			iconPosition={iconPosition}
			htmlType={htmlType}
			onClick={onClickFunc}
			loading={isLoading}
			type={type}
			{...rest}
		>
			{children}
		</ButtonItem>
	)
}

export default Button
