import styled from "styled-components"

export const Container = styled.div`
    margin-left: 1rem;
    margin-top: 2rem;
    @media screen and (min-width: 768px) {
        margin-left: 12rem;
    }
    > button {
        width: fit-content;
        margin-bottom: 2rem;
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 0 1rem;
        font-weight: 300;
        padding: 6px 16px;
        font-family: var(--font-standard), sans-serif;
        @media screen and (min-width: 768px) {
            font-size: 1.25rem;
        }
    }
`
