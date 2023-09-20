import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useUsers } from '../../../providers/User';
import { FormUsuario } from '../../../components/UsuarioForm';
import Title from '../../../components/Title';
import TitlePage from '../../../components/TitlePage';
import { Container } from './styles';
import { Avatar, List, Skeleton } from 'antd';
import NewUser from '../../../components/NewUser';
import Button from '../../../components/Button';
import { Trash, UserPlus } from 'phosphor-react';

const Users = () => {
    const { getAllUsers, users } = useUsers();
    const [load, setLoad] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        getAllUsers(setLoad);
    }, []);
    return (
        <>
            <TitlePage title="Configurações" />
            <Title>Usuários</Title>
            <Container>
                <Button
                    type="button"
                    onClickFunc={() => setIsModalOpen(!isModalOpen)}
                >
                    Novo Usuário
                    <UserPlus />
                </Button>
                <NewUser
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
                <List
                    itemLayout="horizontal"
                    dataSource={users}
                    pagination={{ position: 'bottom', align: 'end' }}
                    renderItem={(u) => (
                        <List.Item>
                            <Skeleton
                                loading={load}
                                active
                                title
                                paragraph={{ rows: 2 }}
                                style={{ width: '50%' }}
                            >
                                <List.Item.Meta
                                    title={
                                        <Link to={`${u.id}`}>{`${
                                            u.codigo ? u.codigo + ' - ' : ''
                                        }${u.nome}`}</Link>
                                    }
                                    description={`${
                                        u.ativo ? 'Ativo' : 'Inativo'
                                    } - Perfil: ${u.perfil.descricao}`}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Container>
        </>
    );
};

export default Users;
