import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: routes;
    margin: 0 4rem;
    justify-self: stretch;
`;
export const ListHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    background: var(--teal-100);
    border-radius: 8px 8px 0px 0px;
    border: 2px solid var(--zinc-700);
    border-bottom: none;

    &:first-child {
        border-right: 2px solid var(--zinc-700);
    }
    > span {
        width: 50%;
        text-align: center;
    }
`;

export const ListStyled = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    border: 2px solid var(--zinc-700);
    background-color: var(--slate-200);
    border-radius: 0px 0px 8px 8px;
    width: 100%;
    > li {
        width: 100%;
        margin: 0.5rem 0;
        > div {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            width: 100%;
        }
    }
`;
