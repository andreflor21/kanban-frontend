import CaretDown from "assets/caretdown.svg"
import styled from "styled-components"

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2rem auto 1rem;
    width: 90%;
    @media only screen and (min-width: 768px) {
        margin: 2rem auto 1rem 12rem;
        width: 40%;
    }

    > span {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
    }

    &.modal {
        margin: 0 auto;
        width: 80%;
    }
`

export const ButtonForm = styled.button`
    margin-top: 2rem;
    max-width: 200px;
    position: relative;
`
export const SelectStyled = styled.select`
    background: var(--gray-100);
    border: 2px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    font-size: 1rem;
    font-family: var(--font-standard);
    padding: 0.5rem;
    position: relative;
    z-index: 1;

    &::placeholder {
        color: var(--slate-400);
    }
    &:disabled {
        border: none;
    }
    appearance: none;
`

export const OptionStyled = styled.option`
    color: var(--black);
    width: 90%;
    &::hover {
        background-color: var(--indigo-700);
        color: var(--gray-100);
    }
`
export const LabelStyled = styled.label`
    font-family: var(--font-standard);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-transform: capitalize;
    padding: 0.5rem;
`

export const ContainerSelect = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    &::after {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        background: url(${CaretDown}) no-repeat center center;
        width: 24px;
        height: 42px;
        position: absolute;
        right: 10px;
        bottom: 0;
        z-index: 1;
    }
    &.disabled {
        &::after {
            content: none;
        }
    }
`
export const ErrorMessage = styled.span`
    font-family: var(--font-standard);
    font-size: 0.8rem;
    color: tomato;

    position: absolute;
    top: 9px;
    right: 10px;
    animation: appear 300ms forwards ease-in-out;

    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

export const ContainerButtons = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;

    grid-template-areas:
        'button1 button2'
        'button3 button3';
    align-items: center;
    justify-content: flex-start;
    button {
        &.button1 {
            grid-area: button1;
            padding: 6px 16px;
        }
        &.button2 {
            grid-area: button2;
            padding: 6px 16px;
        }
        &.button3 {
            grid-area: button3;
            padding: 6px 16px;
        }
    }
    gap: 0px 16px;
    @media screen and (min-width: 768px) {
        gap: 0px 32px;
    }
`
