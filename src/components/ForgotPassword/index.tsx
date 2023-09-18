import React, { useState } from 'react';
import { Modal } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import { useForm } from 'react-hook-form';
import { ButtonStyled, FormStyled } from './styles';
import { useAuth } from '../../providers/Auth';
import Button from '../Button';
interface FormValues {
    email: string;
}

interface ForgotPasswordProps {
    children: React.ReactNode;
}
export const ForgotPassword = ({ children }: ForgotPasswordProps) => {
    const { userForgotPassword } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const onSubmit = (data: FormValues) => {
        setIsModalOpen(false);
        userForgotPassword(data);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const schema = yup.object().shape({
        email: yup.string().required('Campo obrigatório'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    return (
        <>
            <ButtonStyled type="button" onClick={showModal}>
                {children}
            </ButtonStyled>
            <Modal
                title="Esqueci minha senha"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={false}
            >
                <FormStyled onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        inputType="text"
                        label="Email"
                        placeholder="Digite seu email"
                        {...register('email')}
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Button type="submit">Recuperar senha</Button>
                </FormStyled>
            </Modal>
        </>
    );
};
