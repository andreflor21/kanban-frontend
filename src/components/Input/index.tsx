import { Eye, EyeSlash } from "phosphor-react"
import type React from "react"
import { forwardRef, useState } from "react"
import {
	Button,
	ContainerInner,
	ContainerInput,
	ErrorMessage,
	InputPasswordStyled,
	InputStyled,
	LabelStyled,
} from "./styles"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	inputType: string
	errorMessage?: string
	error?: boolean
	className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			label,
			inputType = "text",
			errorMessage,
			placeholder,
			error = false,
			className,
			...rest
		}: InputProps,
		ref,
	) => {
		const [visible, setVisible] = useState(false)
		return (
			<ContainerInput>
				{label && <LabelStyled htmlFor="">{label}</LabelStyled>}

				{inputType === "password" ? (
					<ContainerInner>
						<InputPasswordStyled
							className={className}
							type={visible ? "text" : "password"}
							placeholder={placeholder}
							{...rest}
							ref={ref}
						/>
						<Button type="button" onClick={() => setVisible(!visible)}>
							{visible ? (
								<Eye color="#272F51" size={18} />
							) : (
								<EyeSlash color="#272F51" size={18} />
							)}
						</Button>
					</ContainerInner>
				) : (
					<InputStyled
						className={className}
						type={inputType}
						placeholder={placeholder}
						{...rest}
						ref={ref}
					/>
				)}
				{error && <ErrorMessage>{errorMessage}</ErrorMessage>}
			</ContainerInput>
		)
	},
)

export default Input
