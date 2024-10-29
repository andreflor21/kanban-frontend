import { ContainerInput, ErrorMessage } from "@/components/Input/styles"
import * as S from "@/components/InputSelect/styles"
import { PlusOutlined } from "@ant-design/icons"
import {
	Button,
	Divider,
	Flex,
	type GetProps,
	Input,
	type InputRef,
	Select,
	type SelectProps,
	Tooltip,
} from "antd"
import { Asterisk } from "phosphor-react"
import React, { useRef, useState } from "react"

type Option = { value: string; label: string }

type CreateProps = {
	actionLabel: string
	onNewValue: (value: string) => void
	placeholder: string
	isLoading: boolean
	isDisabled: boolean
}

type DropDownWithCreateProps = GetProps<SelectProps> & {
	label: string
	placeholder: string
	required?: boolean
	errorMessage?: string
	currentValue: string
	onSelectOption: (value: string, id: string) => void
	creation: CreateProps
	options: Option[]
}

export const DropDownWithCreate = ({
	label,
	placeholder,
	required = false,
	errorMessage = undefined,
	options,
	currentValue,
	onSelectOption,
	creation,
	size = "large",
	...rest
}: DropDownWithCreateProps) => {
	const hasError = Boolean(errorMessage)
	const [name, setName] = useState("")
	const inputRef = useRef<InputRef>(null)

	const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value)
	}

	const addItem = (
		e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
	) => {
		e.preventDefault()
		creation.onNewValue(name)
		setName("")
		setTimeout(() => {
			inputRef.current?.focus()
		}, 0)
	}

	const handleSelect = (value: Option) => {
		onSelectOption(value.label, value.value)
	}

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
			<Select
				placeholder={placeholder}
				dropdownRender={(menu) => (
					<React.Fragment key={menu.key}>
						{menu}
						<Divider style={{ margin: "8px 0" }} />
						<Flex gap={"small"} style={{ padding: "0 12px 8px" }}>
							<Input
								placeholder={creation.placeholder}
								ref={inputRef}
								value={name}
								onChange={onNameChange}
								onKeyDown={(e) => e.stopPropagation()}
								disabled={creation.isDisabled || creation.isLoading}
							/>
							<Button
								type="text"
								icon={<PlusOutlined />}
								onClick={addItem}
								loading={creation.isLoading}
								disabled={creation.isDisabled}
							>
								{creation.actionLabel}
							</Button>
						</Flex>
					</React.Fragment>
				)}
				options={options}
				size={size}
				{...rest}
				value={currentValue ?? undefined}
				onChange={(_, option: Option) => handleSelect(option)}
			/>
			{hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</ContainerInput>
	)
}
