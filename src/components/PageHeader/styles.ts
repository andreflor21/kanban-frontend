import { BREAKPOINTS, spacing } from "@/style/global"
import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    gap: ${spacing.xxxs};
    margin-bottom: ${spacing.xs};
    
    input {
        height: ${spacing.xs};
        &::placeholder {
            font-size: ${spacing.xxs}
        }
    }
    
    button {
        margin-top: 0;
        padding: ${spacing.xxxs};
        
        .ant-btn-icon{
            display: none;
        }
    }
    
    @media (min-width: ${BREAKPOINTS.MD}) {
        margin-right: ${spacing.md};

        button {
            margin-top: initial;
            padding: 0 ${spacing.xxs};

            .ant-btn-icon{
                display: initial;
            }
        }
    }
`
