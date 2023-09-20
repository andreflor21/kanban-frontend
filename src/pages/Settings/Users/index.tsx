import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useUsers } from '../../../providers/User';
import { FormUsuario } from '../../../components/UsuarioForm';
import Title from '../../../components/Title';
import TitlePage from '../../../components/TitlePage';
import { Container } from './styles';

const Users = () => {
    const { getAllUsers, users } = useUsers();

    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <>
            <TitlePage title="Configurações" />
            <Title>Usuários</Title>
            <Container>
                <ul>
                    {users.map((u) => (
                        <li key={u.id}>
                            <Link to={`${u.id}`}>{u.nome}</Link>
                        </li>
                    ))}
                </ul>
            </Container>
        </>
    );
};

export default Users;
