import { Check } from 'phosphor-react';
import * as RCheckbox from '@radix-ui/react-checkbox';
import { Container, Root, Indicator, LabelStyled } from './styles';

interface CheckboxProps extends RCheckbox.CheckboxProps {
    label?: string;
}
export const Checkbox = ({ label }: CheckboxProps) => {
    return (
        <Container>
            <Root>
                <Indicator>
                    <Check color="#4338ca" weight="bold" size={24} />
                </Indicator>
            </Root>
            <LabelStyled htmlFor="">{label}</LabelStyled>
        </Container>
    );
};
