import type React from "react"
import { ButtonItem } from "./styles"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	onClickFunc?: (e: React.MouseEvent<HTMLButtonElement>) => void
	// whiteSchema?: boolean;
	children: React.ReactNode
	type?: "button" | "submit" | "reset" | undefined
}

const Button = ({
	onClickFunc,
	type,
	// whiteSchema = false,
	children,
	...rest
}: ButtonProps) => {
	return (
		<ButtonItem
			type={type}
			// whiteSchema={whiteSchema}
			onClick={onClickFunc}
			{...rest}
		>
			{children}
		</ButtonItem>
	)
}

export default Button
