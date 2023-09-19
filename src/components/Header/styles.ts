import styled, { css } from 'styled-components';

interface ResponsiveMenuProps {
    openMenu: boolean;
}
export const HeaderBar = styled.header`
    width: 100%;
    padding: 1rem 2rem;
    height: 4rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--teal-100);
    overflow: hidden;
    a.logo {
        display: flex;
        gap: 16px;
        align-items: center;
        justify-content: space-between;
        color: var(--blue-900);
        &:active {
            text-decoration: none;
        }
        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
    img {
        transition: all 350ms;
        height: 32px;
    }

    nav.desktop {
        display: none;
        justify-content: space-between;

        @media screen and (min-width: 768px) {
            display: flex;
            justify-content: flex-end;
        }
    }

    @media screen and (min-width: 768px) {
        justify-content: flex-end;
        img {
            height: 42px;
        }
    }
`;

export const ResponsiveMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
    z-index: 2000;
    cursor: pointer;
    width: 100%;
    svg {
        color: var(--blue-900);
    }
    div {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        p {
            text-wrap: nowrap;
            margin-left: -64px;
        }
    }
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

export const ResponsiveMenuContent = styled.nav`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 80%;
    z-index: 1000;
    background-color: var(--slate-200);
    box-shadow: -100px 0px 1000px 1000px rgba(0, 0, 0, 0.7);
    opacity: 1;
    transition: all 400ms;

    ${(props: ResponsiveMenuProps) =>
        !props.openMenu &&
        css`
            right: -1000px;
            opacity: 0;
        `}

    @media screen and (min-width: 920px) {
        display: none;
    }
`;
