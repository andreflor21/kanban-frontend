import { type GetProps, type SelectProps, Tooltip } from "antd"
import { Asterisk } from "phosphor-react"
import type React from "react"
import * as S from "./styles"

type Option = {
	value: string
	label: React.ReactNode
}

type InputSelectProps = {
	label: string
	placeholder: string
	options: Array<Option>
	required?: boolean
} & GetProps<SelectProps>

export const InputSelect = ({
	options,
	placeholder,
	label,
	required = false,
	...rest
}: InputSelectProps) => {
	return (
		<>
			<S.LabelStyled htmlFor={label}>
				{label}
				{required && (
					<Tooltip title={"Campo obrigatório"}>
						<Asterisk size={10} />
					</Tooltip>
				)}
			</S.LabelStyled>
			<S.SelectStyled
				id={label}
				options={options}
				optionFilterProp="label"
				placeholder={placeholder}
				{...rest}
			/>
		</>
	)
}
