import { BREAKPOINTS, spacing } from "@/style/global"
import styled from "styled-components"

export const ActionsWrapper = styled.div`
	display: flex;
	align-items: center;
    justify-content: space-between;
    padding: 0 ${spacing.xxxs};
    
    svg, a {
        font-size: 18px;
        cursor: pointer;
        &.delete{
            color: var(--red-500);
        }
    }
`

export const TableWrapper = styled.div`
    padding: 0;
    
    @media (min-width: ${BREAKPOINTS.MD}) {
        padding: 0 ${spacing.md} 0 0;
    }
`

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
