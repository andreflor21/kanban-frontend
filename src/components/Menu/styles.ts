import { Menu } from "antd"
import styled from "styled-components"

interface MenuProps {
	inlineCollapsed: boolean
}

export const MenuAnt = styled(Menu)`
    &.mobile {
        margin-top: 70px;
        background-color: transparent;
        border: 0;
        font-family: var(--font-standard) !important;
        @media only screen and (min-width: 768px) {
            display: none;
        }
    }
    &.pc {
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
							props.inlineCollapsed ? "none" : "inline-block"} !important;
        }

        @media screen and (min-width: 720px) {
            display: flex;
            flex-direction: column;
            position: relative;
            height: 100%;
            padding-right: 0px;
            padding-bottom: 0px;
        }
    }
`
