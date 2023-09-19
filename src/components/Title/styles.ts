import styled from 'styled-components';

export const TitleStyled = styled.h1`
    font-family: var(--font-secondary);
    font-style: normal;
    font-weight: 600;
    color: var(--zinc-700);
    margin-top: 5rem;
    font-size: 1.5rem;
    text-align: left;
    margin-left: 1rem;
    @media only screen and (min-width: 768px) {
        margin-left: 12rem;
        margin-top: 1rem;
        z-index: 2;
        position: relative;
    }
`;
