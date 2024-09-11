import { Tooltip } from "antd"
import { Asterisk, Eye, EyeSlash } from "phosphor-react"
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
	required?: boolean
	label?: string
	inputType?: string
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
			required = false,
			...rest
		}: InputProps,
		ref,
	) => {
		const [visible, setVisible] = useState(false)
		return (
			<ContainerInput>
				{label && (
					<LabelStyled htmlFor="">
						{label}
						{required && (
							<Tooltip title={"Campo obrigatório"}>
								<Asterisk size={10} />
							</Tooltip>
						)}
					</LabelStyled>
				)}

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
						error={error}
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
