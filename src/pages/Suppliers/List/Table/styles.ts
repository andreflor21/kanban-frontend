import { BREAKPOINTS, spacing } from "@/style/global"
import styled from "styled-components"

export const NameWrapper = styled.div`
    i {
        font-size: 12px;
    }
`

export const TableWrapper = styled.div`
    padding: 0;
    
    @media (min-width: ${BREAKPOINTS.MD}) {
        padding: 0 ${spacing.md} 0 0;
    }
`
