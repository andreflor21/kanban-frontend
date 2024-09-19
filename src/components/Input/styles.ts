import { spacing } from "@/style/global"
import styled from "styled-components"

interface InputStyledProps {
	error: boolean
}

export const InputStyled = styled.input<InputStyledProps>`
    background: var(--gray-100);
    border: ${spacing.nano} solid
        ${({ error }: InputStyledProps) =>
					error ? "var(--red-500)" : "var(--gray-200)"};
    box-sizing: border-box;
    border-radius: ${spacing.xxxs};
    width: 100%;
    font-size: 1rem;
    font-family: var(--font-standard), sans-serif;
    padding: ${spacing.xxxs} ${spacing.xxs};
    transition: all 300ms;
    outline: none;
    &::placeholder {
        color: var(--slate-400);
    }
    &:disabled {
        border: none;
    }
    &::-webkit-calendar-picker-indicator {
        opacity: 0.4;
    }
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	[type=number] {
		-moz-appearance: textfield;
	}
`
export const InputPasswordStyled = styled.input`
    background-color: var(--gray-100);
    border: none;
    box-sizing: border-box;
    width: 100%;
    font-size: 1rem;
    font-family: var(--font-standard), sans-serif;
    outline: none;
    transition: all 300ms;
    &::placeholder {
        color: var(--slate-400);
    }
`
export const LabelStyled = styled.label`
    font-family: var(--font-standard), sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-transform: capitalize;
    padding: 0.5rem;
	display: flex;
	
	>svg{
		color:#E80202;
		margin-left: ${spacing.micro};
	}
`
export const ContainerInput = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;

`
export const ContainerInner = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: var(--gray-100);
    box-sizing: border-box;
    border-radius: 8px;
    font-size: 1rem;
    font-family: var(--font-standard), sans-serif;
    padding: 8px 16px;
    transition: all 300ms;
    outline: none;
`
export const Button = styled.button`
    background-color: transparent;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
`
export const ErrorMessage = styled.span`
    font-family: var(--font-standard), sans-serif;
    font-size: 0.8rem;
    color: var(--red-500);

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
