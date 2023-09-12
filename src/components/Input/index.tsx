import React, { forwardRef } from 'react';

import {
    InputStyled,
    LabelStyled,
    ContainerInput,
    ErrorMessage,
} from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    inputType: string;
    errorMessage?: string;
    error?: boolean;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            inputType = 'text',
            errorMessage,
            placeholder,
            error = false,
            className,
            ...rest
        }: InputProps,
        ref
    ) => {
        return (
            <ContainerInput>
                {label && <LabelStyled htmlFor="">{label}</LabelStyled>}
                <InputStyled
                    className={className}
                    type={inputType}
                    placeholder={placeholder}
                    {...rest}
                    ref={ref}
                />
                {error == true ? (
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                ) : undefined}
            </ContainerInput>
        );
    }
);

export default Input;
