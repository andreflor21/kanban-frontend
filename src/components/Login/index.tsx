// import React from 'react';

import {
    Container,
    LogoStyled,
    Title,
    FormStyled,
    TextStyled,
    LinkStyled,
} from './styles';
import Logo from '../../assets/logo.svg';
import Input from '../Input';
import Button from '../Button';
const Login = () => {
    return (
        <Container>
            <Title>Kanban</Title>
            <LogoStyled src={Logo} />
            <TextStyled>Login</TextStyled>
            <FormStyled>
                <Input
                    inputType="email"
                    label="Email"
                    placeholder="Digite seu email"
                />
                <Input
                    inputType="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                />

                <Button type="submit">Login</Button>
            </FormStyled>
            <LinkStyled href="/esqueci-minha-senha">
                Esqueci minha senha
            </LinkStyled>
        </Container>
    );
};

export default Login;
