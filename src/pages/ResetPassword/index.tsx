// import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Container,
    LogoStyled,
    Title,
    FormStyled,
    TextStyled,
    ContainerLogo,
    ContainerForm,
    Wrapper,
    ImgStyled,
    InnerWrapper,
    ListStyled,
} from './styles';
import Logo from '../../assets/logo.svg';
import imgForgotPassword from '../../assets/forgot_password.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { ForgotPassword } from '../../components/ForgotPassword';
import { useNavigate, useParams } from 'react-router-dom';
import { useUsers } from '../../providers/User';

interface FormValues {
    password: string;
    confirmPassword: string;
}
const ResetPassword = () => {
    const { token } = useParams();
    const [load, setLoad] = useState<boolean>(false);
    const { resetPassword } = useUsers();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        password: yup.string().required('Campo obrigatório'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Senhas diferentes')
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
        if (token) {
            resetPassword(token, data, navigate);
        }
    };
    return (
        <>
            <Container>
                <Wrapper>
                    <ContainerLogo>
                        <LogoStyled src={Logo} />
                        <Title>Kanban</Title>
                    </ContainerLogo>
                    <InnerWrapper>
                        <ImgStyled src={imgForgotPassword} />
                    </InnerWrapper>
                </Wrapper>
                <ContainerForm>
                    <TextStyled>Redefinir senha</TextStyled>
                    <FormStyled onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            inputType="password"
                            label="Nova senha"
                            placeholder="Digite sua senha"
                            {...register('password')}
                            error={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <Input
                            inputType="password"
                            label="Confirmar Senha"
                            placeholder="Redigite sua senha"
                            {...register('confirmPassword')}
                            error={!!errors.confirmPassword}
                            errorMessage={errors.confirmPassword?.message}
                        />

                        <Button type="submit">Redefinir senha</Button>
                    </FormStyled>
                    {/* <LinkStyled href="/esqueci-minha-senha">
                        Esqueci minha senha
                    </LinkStyled> */}
                </ContainerForm>
            </Container>
        </>
    );
};

export default ResetPassword;