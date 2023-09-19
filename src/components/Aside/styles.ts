import { Menu } from 'antd';
import styled, { keyframes } from 'styled-components';

interface IndicatorProps {
    leftIndicator: string;
    topIndicator: string;
}
interface MenuProps {
    inlineCollapsed: boolean;
}

const appearFromNowhere = keyframes`
from{
    opacity: 0;
}

to{
    opacity: 1;
}
`;

export const AsideContainer = styled.aside`
    display: none;
    @media screen and (min-width: 426px) {
        width: 100%;
        height: 80px;

        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 3;
        display: flex;
        justify-content: center;
        background-color: var(--emerald-400);
        border-radius: 0;
    }
    div {
        /* width: 90%; */
        margin: 0 auto;
    }
    h3 {
        /* position: absolute;
        top: 32px;
        left: 50%; */
        font-size: 2rem;
        color: var(--blue-900);
        animation: ${appearFromNowhere} 1s;
    }
    @media screen and (min-width: 720px) {
        height: 100vh;
        transition: width 0.4s;
        border-radius: 0 24px 24px 0;
        justify-content: flex-start;

        width: 128px;

        &.hovered {
            width: 300px;
            span {
                padding-left: 12px;
                font-size: 20px;
                color: var(--blue-900);
                font-weight: 400;
                display: flex;
                align-items: center;
                animation: ${appearFromNowhere} 1s;
            }
        }

        z-index: 3;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--emerald-400);

        padding: 150px 12px 0;
    }
`;

export const MenuWrapper = styled.nav`
    width: 100%;
    height: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding-right: 8px;

    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        position: relative;
        z-index: 450;
        padding: 0 6px 0;
        margin-right: 8px;

        span {
            color: var(--blue-900);
            font-weight: 600;
            font-size: 18px;
            display: none;
        }

        svg {
            fill: var(--blue-900);
            color: var(--blue-900);
            margin-right: 0;
            width: 30px;
            height: 30px;
            &.hide {
                display: none;
            }
            &.show {
                display: block;
            }
        }

        &.navlink--active {
            border-radius: 0;
        }

        &:active {
            fill: var(--blue-900);
            color: var(--blue-900);
        }
    }

    .indicator {
        position: absolute;
        left: ${(props: IndicatorProps) => props.leftIndicator};
        top: 21px;
        background-color: transparent;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        border: 2px solid var(--blue-900);
        z-index: 4;
        transition: left 500ms;
        transform: translateX(-4px);
    }

    @media screen and (min-width: 720px) {
        display: flex;
        flex-direction: column;
        position: relative;
        height: inherit;
        padding-right: 0;
        padding-bottom: 0px;

        a {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 8px 24px;
            position: relative;
            z-index: 450;
            margin-bottom: 18px;
            margin-right: 0px;

            svg {
                fill: var(--blue-900);
                color: var(--blue-900);
                margin-right: 8px;
            }

            &.navlink--active {
                border-radius: 24px 0 0 24px;
            }
        }
        .indicator {
            position: absolute;
            left: 14px;
            top: ${(props) => props.topIndicator};
            background-color: transparent;
            height: 50px;
            width: 50px;
            border-radius: 50%;
            border: 2px solid var(--blue-900);
            z-index: 4;
            transition: top 500ms;
            transform: translateY(-2px);
        }
    }
`;

export const Logo = styled.img`
    display: none;
    @media screen and (min-width: 720px) {
        display: block;
        /* position: absolute;
        top: 20px; */
        width: 48px;
        aspect-ratio: 1/1;
        align-self: center;
    }
`;

export const ContainerLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 32px;
    padding: 0px 20px;
    position: absolute;
    top: 20px;
`;

export const MenuAnt = styled(Menu)`
    height: 75%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    padding-right: 8px;
    border: none;
    background-color: transparent;
    border-inline-end: none !important;
    font-family: var(--font-standard) !important;
    div {
        display: flex !important;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }

    &.collapsed {
        li {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
            padding: 0px !important;
            div {
                padding-inline-end: 0px !important;
                padding: 0px !important;
            }
        }
    }
    &.open {
        div {
            padding-inline: 40px;
        }
    }
    span {
        display: ${(props: MenuProps) =>
            props.inlineCollapsed ? 'none' : 'inline-block'} !important;
    }

    @media screen and (min-width: 720px) {
        display: flex;
        flex-direction: column;
        position: relative;
        height: 100%;
        padding-right: 0px;
        padding-bottom: 0px;
    }
`;
