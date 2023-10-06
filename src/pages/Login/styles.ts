import styled from 'styled-components';
// import LogoDark from 'assets/logo_outline.svg';

export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* border: 1px solid red; */
    background-color: var(--slate-200);
    @media only screen and (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
        background-color: var(--gray-100);
    }
`;
export const ContainerLogo = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    @media only screen and (min-width: 768px) {
        height: 86px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin: 45px 0 0 45px;
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;
export const InnerWrapper = styled.div`
    display: none;
    @media only screen and (min-width: 768px) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    @media only screen and (min-width: 1024px) {
        justify-content: space-around;
    }
    @media only screen and (min-width: 1440px) {
        align-items: flex-end;
        justify-content: space-around;
        flex-direction: row-reverse;
    }
`;

export const ListStyled = styled.ul`
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    margin-bottom: 2rem;
    @media only screen and (min-width: 1024px) {
        padding: 0;
        margin-bottom: 0;
        margin-left: 2rem;
    }
    li {
        color: var(--Blue-900, #272f51);
        font-family: Poppins;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: justify;
        text-wrap: nowrap;
    }
`;

export const ImgStyled = styled.img`
    align-self: center;
    margin-top: 2rem;
    width: 100%;
    padding: 2rem;
    max-height: 480px;
    @media only screen and (min-width: 1920px) {
        max-height: 680px;
        padding: 0;
    }
`;
export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media only screen and (min-width: 768px) {
        width: 75%;
        height: 100vh;
        background-color: var(--emerald-400);
        border-radius: 60px 0px 0px 0px;
    }
    @media only screen and (min-width: 1440px) {
        width: 50%;
    }
`;
export const LogoStyled = styled.img`
    height: 5rem;
`;

export const Title = styled.h2`
    font-family: var(--font-standard);
    color: var(--blue-900);
    font-size: 48px;
    padding-bottom: 2rem;

    @media only screen and (min-width: 768px) {
        padding-left: 2rem;
        padding-bottom: 0;
    }
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 90%;
    justify-content: space-between;
    align-items: center;
    gap: 32px;
    max-width: 20rem;
    @media only screen and (min-width: 768px) {
        width: 75%;
    }
`;

export const TextStyled = styled.h3`
    font-family: var(--font-standard);
    color: var(--blue-900);
    font-size: 34px;
    font-weight: 600;
    padding-left: 16px;
    padding-top: 30px;
    padding-bottom: 16px;
    align-self: flex-start;
    @media only screen and (min-width: 768px) {
        padding-left: 36px;
    }
`;

export const LinkStyled = styled.a`
    color: var(--gray-100);
    margin-top: 22px;
    text-transform: lowercase;
    text-decoration: underline;

    &:hover {
        color: var(--blue-900);
    }
    &:active {
        color: var(--gray-100);
    }
`;
