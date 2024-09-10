import type * as RCheckbox from "@radix-ui/react-checkbox"
import { Check } from "phosphor-react"
import { Container, Indicator, LabelStyled, Root } from "./styles"

interface CheckboxProps extends RCheckbox.CheckboxProps {
	label?: string
}
export const Checkbox = ({ label, ...rest }: CheckboxProps) => {
	return (
		<Container>
			<Root {...rest}>
				<Indicator>
					<Check color="#4338ca" weight="bold" size={24} />
				</Indicator>
			</Root>
			<LabelStyled htmlFor="">{label}</LabelStyled>
		</Container>
	)
}
