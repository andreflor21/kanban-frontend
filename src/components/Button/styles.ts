import styled from 'styled-components';

export const ButtonItem = styled.button`
    cursor: pointer;
    outline: none;
    border: none;
    background: var(--blue-900);
    color: var(--emerald-400);

    border-radius: 8px;
    font-size: 18px;
    padding: 6px 32px;
    transition: all 350ms;
    width: 234px;
    &:hover {
        background-color: var(--teal-100);
    }

    &:disabled {
        background-color: var(--slate-200);
    }

    @media (min-width: 800px) {
        font-size: 22px;
    }
`;