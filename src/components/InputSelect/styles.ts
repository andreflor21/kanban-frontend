import { spacing } from "@/style/global"
import { Select } from "antd"
import styled from "styled-components"

export const SelectStyled = styled(Select)`
    background: var(--gray-100);
    border: 2px solid var(--gray-200);
    box-sizing: border-box;
    border-radius: ${spacing.xxxs};
    width: 100%;
    height: 2.5rem;
    font-family: var(--font-standard), sans-serif;
    

    &::placeholder {
        color: var(--slate-400);
    }
    &:disabled {
        border: none;
    }
    appearance: none;
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
