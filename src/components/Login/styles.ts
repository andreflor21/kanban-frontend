import styled from 'styled-components';
// import LogoDark from '../../assets/logo_outline.svg';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 390px;
    align-items: center;
    /* border: 1px solid red; */
    background-color: var(--slate-200);
`;

export const LogoStyled = styled.img`
    height: 5rem;
`;

export const Title = styled.h2`
    font-family: var(--font-standard);
    color: var(--blue-900);
    font-size: 48px;
    padding-bottom: 2rem;
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 65%;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
`;

export const TextStyled = styled.h3`
    font-family: var(--font-standard);
    color: var(--blue-900);
    font-size: 34px;
    font-weight: 600;
    align-self: start;
    padding-left: 70px;
    padding-top: 30px;
    padding-bottom: 16px;
`;

export const LinkStyled = styled.a`
    color: var(--gray-100);
    margin-top: 22px;
    text-transform: lowercase;
    text-decoration: underline;

    &:hover {
        color: var(--emerald-400);
    }
    &:active {
        color: var(--gray-100);
    }
`;
