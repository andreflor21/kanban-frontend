import React from 'react';
import { Container } from './styles';
import { FormUsuario } from '../../components/UsuarioForm';
import TitlePage from '../../components/TitlePage';
import Title from '../../components/Title';

const Settings = () => {
    return (
        <Container>
            <TitlePage title="Configurações" />
            <Title>Configurações</Title>
            <FormUsuario />
        </Container>
    );
};

export default Settings;
