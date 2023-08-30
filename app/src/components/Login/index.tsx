// import React from 'react';

import { Container, LogoStyled, Title, FormStyled, TextStyled } from './styles';
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
            <a
                style={{
                    marginTop: '22px',
                    textTransform: 'lowercase',
                    textDecoration: 'underline',
                }}
                href="/esqueci-minha-senha"
            >
                Esqueci minha senha
            </a>
        </Container>
    );
};

export default Login;
