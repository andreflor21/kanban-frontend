import styled from "styled-components"

export const ButtonStyled = styled.button`
    color: var(--gray-100);
    margin-top: 22px;
    text-transform: lowercase;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 18px;
    &:hover {
        color: var(--blue-900);
    }
    &:active {
        color: var(--gray-100);
    }
`
