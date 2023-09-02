// import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../providers/Auth';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
import { useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    senha: string;
}
const Login = () => {
    const [load, setLoad] = useState<boolean>(false);
    const { userLogin } = useAuth();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().required('Campo obrigatório'),
        senha: yup
            .string()
            .min(6, 'Mínimo de 6 dígitos')
            .required('Campo obrigatório'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormValues) => {
        setLoad(true);
        userLogin(data, setLoad, navigate);
    };
    return (
        <Container>
            <Title>Kanban</Title>
            <LogoStyled src={Logo} />
            <TextStyled>Login</TextStyled>
            <FormStyled onSubmit={handleSubmit(onSubmit)}>
                <Input
                    inputType="email"
                    label="Email"
                    placeholder="Digite seu email"
                    {...register('email')}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                />
                <Input
                    inputType="password"
                    label="Senha"
                    placeholder="Digite sua senha"
                    {...register('senha')}
                    error={!!errors.senha}
                    errorMessage={errors.senha?.message}
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
