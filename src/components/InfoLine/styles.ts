import { spacing } from "@/style/global"
import styled from "styled-components"

export const InfoLineWrapper = styled.div`
    display: flex;
    margin-bottom: ${spacing.xxxs};
    flex: 1;

    .lineTitle, .lineContent {
        margin: 0;
        font-family: var(--font-standard), sans-serif;
    }

    .lineTitle {
        flex: 0.25;
    }

    .lineContent {
        flex: 0.75;
        display: flex;
    }
`