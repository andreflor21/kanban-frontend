// import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../providers/Auth';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Container,
    LogoStyled,
    Title,
    FormStyled,
    TextStyled,
    LinkStyled,
    ContainerDesktop,
    ContainerLogo,
    ContainerForm,
    Wrapper,
    ImgStyled,
    InnerWrapper,
    ListStyled,
} from './styles';
import Logo from '../../assets/logo.svg';
import imgLogin from '../../assets/img_login_desktop.svg';
import Input from '../Input';
import Button from '../Button';
import { ForgotPassword } from '../ForgotPassword';
import { useNavigate } from 'react-router-dom';
import { ForgotPassword } from '../ForgotPassword';

interface FormValues {
    email: string;
    senha: string;
}
const Login = () => {
    const [load, setLoad] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
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
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [isMobile]);
    return (
        <>
            <Container>
                <Wrapper>
                    <ContainerLogo>
                        <LogoStyled src={Logo} />
                        <Title>Kanban</Title>
                    </ContainerLogo>
                    <InnerWrapper>
                        <ImgStyled src={imgLogin} />
                        <ListStyled>
                            <li>Otimizando estoque</li>
                            <li>Melhorando pedidos</li>
                            <li>Integrando produção</li>
                            <li>Agilizando suprimentos</li>
                            <li>Unificando operações</li>
                        </ListStyled>
                    </InnerWrapper>
                </Wrapper>
                <ContainerForm>
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
                    {/* <LinkStyled href="/esqueci-minha-senha">
                        Esqueci minha senha
                    </LinkStyled> */}
                    <ForgotPassword>Esqueci minha senha</ForgotPassword>
                </ContainerForm>
            </Container>
        </>
    );
};

export default Login;
