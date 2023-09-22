import { styled } from 'styled-components';
import * as Checkbox from '@radix-ui/react-checkbox';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    align-items: center;
    padding: 0.5rem 0;
`;

const LabelStyled = styled.label`
    font-family: var(--font-standard);
    color: var(--black);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-transform: capitalize;
    padding: 0.5rem;
`;
const Indicator = styled(Checkbox.Indicator)`
    color: ${(props: Checkbox.CheckboxProps) =>
        !props.checked ? 'var(--indigo-700)' : 'var(--gray-100)'};
    margin-top: 0;
`;
const Root = styled(Checkbox.Root)`
    background-color: var(--gray-100);
    width: 25px;
    height: 25px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0 !important;
`;
export { Container, LabelStyled, Indicator, Root };
