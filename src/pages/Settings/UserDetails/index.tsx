import React, { useEffect } from 'react';
import { FormUsuario } from '../../../components/UsuarioForm';
import { useParams } from 'react-router-dom';
import { useUsers } from '../../../providers/User';
import TitlePage from '../../../components/TitlePage';
import Title from '../../../components/Title';

// import { Container } from './styles';

const UserDetails = () => {
    const { usuarioId } = useParams();
    const { getUser, currentUser } = useUsers();
    useEffect(() => {
        if (usuarioId) getUser(parseInt(usuarioId));
    }, [usuarioId]);

    return (
        <>
            {usuarioId && (
                <>
                    <TitlePage title="Configurações" />
                    <Title>Informações do Usuário</Title>
                    <FormUsuario usuario={currentUser} usuarioId={usuarioId} />
                </>
            )}
        </>
    );
};

export default UserDetails;
