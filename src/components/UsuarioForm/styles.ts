import styled from 'styled-components';
import CaretDown from '../../assets/caretdown.svg';

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2rem auto 1rem;
    width: 50%;
    @media only screen and (min-width: 768px) {
        margin: 2rem auto 1rem 12rem;
    }
    button {
        margin-top: 2rem;
        max-width: 200px;
        position: relative;
    }

    > span {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        padding: 0.5rem;
    }
`;
export const SelectStyled = styled.select`
    background: var(--gray-100);
    border: 2px solid var(--gray-500);
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    font-size: 1rem;
    font-family: var(--font-standard);
    padding: 0.5rem;
    position: relative;
    z-index: 1;

    &::placeholder {
        color: var(--slate-400);
    }

    appearance: none;
`;

export const OptionStyled = styled.option`
    color: var(--black);
    width: 90%;
    &::hover {
        background-color: var(--indigo-700);
        color: var(--gray-100);
    }
`;
export const LabelStyled = styled.label`
    font-family: var(--font-standard);
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    text-transform: capitalize;
    padding: 0.5rem;
`;

export const ContainerSelect = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    &::after {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        background: url(${CaretDown}) no-repeat center center;
        width: 24px;
        height: 42px;
        position: absolute;
        right: 10px;
        bottom: 0;
        z-index: 2;
    }
`;
export const ErrorMessage = styled.span`
    font-family: var(--font-standard);
    font-size: 0.8rem;
    color: tomato;

    position: absolute;
    top: 9px;
    right: 10px;
    animation: appear 300ms forwards ease-in-out;

    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;