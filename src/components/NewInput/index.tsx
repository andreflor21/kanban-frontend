import { ContainerInput, ErrorMessage } from "@/components/Input/styles"
import * as S from "@/components/InputSelect/styles"
import { type GetProps, Input, type InputProps, Tooltip } from "antd"
import { Asterisk } from "phosphor-react"
import type React from "react"

type NewInputProps = {
	label: string
	placeholder: string
	required?: boolean
	errorMessage?: string
} & GetProps<InputProps>

export const NewInput = ({
	label,
	placeholder,
	required = false,
	errorMessage = undefined,
	size = "large",
	allowClear = true,
	...rest
}: NewInputProps) => {
	const hasError = Boolean(errorMessage)
	return (
		<ContainerInput>
			<S.LabelStyled htmlFor={label}>
				{label}
				{required && (
					<Tooltip title={"Campo obrigatório"}>
						<Asterisk size={10} />
					</Tooltip>
				)}
			</S.LabelStyled>
			<Input
				allowClear={allowClear}
				size={size}
				placeholder={placeholder}
				status={hasError ? "error" : undefined}
				{...rest}
			/>
			{hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</ContainerInput>
	)
}
