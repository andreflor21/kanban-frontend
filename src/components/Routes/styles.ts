import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    grid-area: routes;
    width: 95%;
    /* margin: 0 4rem; */
    justify-self: stretch;
    > div {
        .ant-list-header {
            display: flex;
            width: 100%;
            justify-content: space-between;
            padding: 0.875rem 2rem;
            font-family: var(--font-standard);
        }
        div > div > ul.ant-list-items {
            li.ant-list-item {
                padding-left: 2rem;
                padding-right: 2rem;
                div > div > h4.ant-list-item-meta-title {
                    font-weight: 400;
                    font-style: italic;
                    font-family: var(--font-standard);
                }

                ul.ant-list-item-action {
                    li > button.ant-switch {
                        margin: 0 auto;
                        &.ant-switch-checked {
                            background: var(--emerald-400);
                            &:hover {
                                background: var(--green-500) !important;
                            }
                        }
                    }
                }
            }
        }
    }
`;
