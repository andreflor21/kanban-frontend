import { spacing } from "@/style/global"
import styled from "styled-components"

export const RouteLine = styled.div`
//border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${spacing.xxxs} 0;
    &:not(:last-child) {
       border-bottom: 1px solid #e8e8e8;
    }
    
`
export const RoutesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    //gap: 12px;
`
