import React from 'react';
import { Title, Container } from './styles';
import { FormUsuario } from '../../components/UsuarioForm';
import TitlePage from '../../components/TitlePage';

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
