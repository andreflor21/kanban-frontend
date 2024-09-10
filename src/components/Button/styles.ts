import styled from "styled-components"

export const ButtonItem = styled.button`
    cursor: pointer;
    outline: none;
    border: none;
    background: var(--blue-900);
    color: var(--emerald-400);
    margin-top: 2rem;
    position: relative;
    border-radius: 8px;
    font-size: 18px;
    padding: 6px 32px;
    transition: all 350ms;
    width: 100%;
    font-family: var(--font-secondary);
    font-weight: 400;
    /* max-width: 15rem; */
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: fit-content;
    text-wrap: nowrap;
    &:hover {
        background-color: var(--blue-400);
        color: var(--gray-100);
        &:disabled {
            color: var(--emerald-400);
        }
    }

    &:disabled {
        background-color: var(--slate-200);
        cursor: default;
    }

    @media (min-width: 800px) {
        font-size: 22px;
    }
`
