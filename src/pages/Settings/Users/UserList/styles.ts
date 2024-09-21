import { spacing } from "@/style/global"
import styled from "styled-components"

export const UserWrapper = styled.span`
    display: flex;
    gap: ${spacing.xxxs};
`

export const UserDetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${spacing.micro};
    padding: ${spacing.xs} 0;
`

export const InfoLine = styled.span`
    display: flex;
    gap: ${spacing.micro};
    padding: ${spacing.micro} 0;
    font-size:16px;
`
export const DeleteWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    
`
