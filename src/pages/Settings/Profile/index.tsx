import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from 'providers/Profile';
import TitlePage from 'components/TitlePage';
import Title from 'components/Title';
import { Copy, Plus, Trash, WarningCircle } from 'phosphor-react';
import { List, Skeleton, Tooltip } from 'antd';
import { Confirm } from 'components/Confirm';
import { Container, ContainerButtons, LinkStyleld } from './styles';

// import { Container } from './styles';

const Profile = () => {
    const { getProfiles, profiles, deleteProfile } = useProfile();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        // setLoad(false);
        getProfiles(setLoad);
    }, [load]);

    const handleDelete = (id: number) => {
        deleteProfile(id);
        console.log(id);
        // message.success('Usuário excluido');
    };
    return (
        <>
            <TitlePage title="Configurações" />
            <Title>Perfil</Title>
            <Container>
                <ContainerButtons>
                    <LinkStyleld to="novo">
                        <span>Novo Perfil</span>
                        <Plus weight="bold" />
                    </LinkStyleld>
                    <LinkStyleld to="duplicar">
                        <span>Duplicar Perfil</span>
                        <Copy weight="fill" />
                    </LinkStyleld>
                </ContainerButtons>
                <List
                    itemLayout="horizontal"
                    style={{
                        marginRight: '2rem',
                    }}
                    dataSource={profiles}
                    pagination={{ position: 'bottom', align: 'end' }}
                    renderItem={(p) => (
                        <List.Item
                            actions={[
                                <Confirm
                                    title="Deseja excluir o usuário"
                                    cancelText="Cancelar"
                                    okText="Excluir"
                                    placement="topRight"
                                    onConfirm={() =>
                                        handleDelete(parseInt(p.id as string))
                                    }
                                    style={{ cursor: 'pointer' }}
                                    icon={
                                        <WarningCircle
                                            size={24}
                                            color={'#ef4444'}
                                        />
                                    }
                                >
                                    <Tooltip title="Excluir">
                                        <Trash
                                            size={18}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                </Confirm>,
                            ]}
                            style={{ fontFamily: 'var(--font-standard)' }}
                        >
                            <Skeleton
                                loading={load}
                                active
                                title
                                paragraph={{ rows: 2 }}
                                style={{ width: '50%' }}
                            >
                                <List.Item.Meta
                                    title={
                                        <Link to={`${p.id}`}>
                                            {p.descricao}
                                        </Link>
                                    }
                                    description={`${
                                        p.usuarios.length > 0
                                            ? p.usuarios.length +
                                              ' usuário(s) vinculado(s)'
                                            : 'Nenhum usuário vinculado'
                                    }`}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Container>
        </>
    );
};

export default Profile;
