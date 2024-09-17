import { spacing } from "@/style/global"
import styled from "styled-components"

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${spacing.xxxs};

    > span {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
    }

`

export const ContainerButtons = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${spacing.xxs};
 
`
