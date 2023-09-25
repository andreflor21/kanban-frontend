import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    margin-left: 1rem;
    margin-top: 2rem;
    @media screen and (min-width: 768px) {
        margin-left: 12rem;
    }
`;

export const ContainerButtons = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    justify-content: space-between;
    gap: 0 2rem;
    margin-bottom: 2rem;
    > button {
        width: fit-content;
        align-items: center;
        display: flex;
        justify-content: space-between;
        gap: 0 1rem;
        font-weight: 300;
        padding: 6px 16px;
        font-family: var(--font-standard);
        @media screen and (min-width: 768px) {
            font-size: 1.25rem;
        }
    }
`;

export const LinkStyleld = styled(Link)`
    cursor: pointer;
    outline: none;
    border: none;
    background: var(--blue-900);
    color: var(--emerald-400);
    margin-top: 2rem;
    /* position: relative; */
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-wrap: nowrap;
    gap: 0 1rem;
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
`;
