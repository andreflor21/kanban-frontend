import { spacing } from "@/style/global"
import styled from "styled-components"

export const DayWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    min-width: 150px;
    gap: ${spacing.micro};
`

export const PageWrapper = styled.div`

    td {
        padding: ${spacing.xxxs} ${spacing.micro} !important;
    }

    .row {
        cursor: pointer;
    }
`
