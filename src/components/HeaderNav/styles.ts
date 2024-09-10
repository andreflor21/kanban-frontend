import { Menu } from "antd"
import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* background-color: var(--teal-100); */
    p {
        color: var(--black);
        font-weight: 500;
        width: 100%;
        font-size: 1rem;
        padding-bottom: 0.5rem;
        margin: 0rem 0 0.5rem;
        text-align: right;
        border-bottom: 1px solid var(--gray-100);
        display: none;
    }

    @media screen and (min-width: 426px) {
        p {
            display: block;
            margin-bottom: 0px;
            padding-bottom: 0;
            border-bottom: none;
            width: auto;
            font-size: 0.9rem;

            margin: 0;
            /* margin-right: 18px; */
        }

        flex-direction: row;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
`

export const Links = styled.span`
    color: var(--black);
    font-weight: 500;
    /* width: 100%; */
    font-size: 2rem;
    text-align: right;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 16px;
    .config {
        color: var(--slate-400);
        font-size: 1.5rem;
    }
    @media screen and (min-width: 840px) {
        margin-bottom: 0px;
        padding-bottom: 0;
        border-bottom: none;
        width: auto;
    }
`

export const MenuWrapper = styled.nav`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 36px;
    position: relative;
    /* padding-right: 8px; */
    /* padding-top: 80px; */
    padding: 80px 8px 0 32px;
    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;
        z-index: 450;
        padding: 0 6px 0;
        margin-right: 8px;
        gap: 12px;
        span {
            color: var(--blue-900);
            font-weight: 400;
            font-size: 18px;
        }

        svg {
            color: var(--blue-900);
            margin-right: 0;
            width: 30px;
            height: 30px;
        }

        &.navlink--active {
            border-radius: 0;
        }
        &:active {
            color: var(--blue-900);
        }
    }

    @media only screen and (min-width: 768px) {
        display: none;
    }
`

export const MenuAnt = styled(Menu)`
    margin-top: 70px;
    background-color: transparent;
    border: 0;
    font-family: var(--font-standard) !important;
    @media only screen and (min-width: 768px) {
        display: none;
    }
`
