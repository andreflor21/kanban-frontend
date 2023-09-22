import {
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactNode,
} from 'react';
import { UsuarioData, Usuario } from '../../types/usuario';
import api from '../../services/api';
import { NavigateFunction, redirect } from 'react-router-dom';
import { useAuth } from '../Auth';
import { notification } from 'antd';
import { CheckCircle, WarningCircle, X } from 'phosphor-react';
import { AxiosError, AxiosResponse } from 'axios';

interface UserProviderProps {
    children: ReactNode;
}
interface EditUser extends Omit<UsuarioData, 'id'> {}
interface ChangePasswordData {
    password: string;
    confirmPassword: string;
}
interface UserProviderData {
    newUser: (
        usuarioData: EditUser,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => void;
    deleteUser: (idUser: number) => void;
    editUser: (usuarioData: EditUser) => void;
    getUser: (
        idUser: number,
        setLoad: Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getAllUsers: (setLoad: Dispatch<boolean>) => void;
    users: Usuario[];
    user: Usuario;
    currentUser: Usuario;
    setCurrentUser: Dispatch<Usuario>;
    setUser: Dispatch<Usuario>;
    changePassword: (idUser: number, data: ChangePasswordData) => void;
    resetPassword: (
        token: string,
        data: ChangePasswordData,
        navigate: NavigateFunction
    ) => void;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: UserProviderProps) => {
    const { token, idUser, user, setUser, setUsername } = useAuth();
    const [users, setUsers] = useState<Usuario[]>([]);
    const [currentUser, setCurrentUser] = useState<Usuario>({} as Usuario);

    const newUser = (
        usuarioData: UsuarioData,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        const senha = Math.round(Math.random() * Math.pow(10, 6)).toString();
        const user: UsuarioData = {
            ...usuarioData,
            senha,
            trocaSenha: true,
        };

        api.post('usuarios/novo', user, {
            headers: { Authorization: 'Bearer ' + token },
        })
            .then((res: AxiosResponse) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: `Usuário criado com sucesso! Senha temporária ${senha}`,
                    duration: 0,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                });
                setLoad(false);
                navigate('/configuracoes/usuarios');
            })
            .catch((err: AxiosError) => {
                setLoad(false);
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro no cadastro do usuário, verifique os dados e tente novamente.',
                    icon: (
                        <CheckCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };

    const editUser = (usuarioData: EditUser) => {
        api.patch(`usuarios/${idUser}`, usuarioData, {
            headers: { Authorization: 'Bearer ' + token },
        })
            .then((response: AxiosResponse) => {
                setUser(response.data.usuario);
                localStorage.setItem(
                    '@kanban/usuario',
                    JSON.stringify(response.data.usuario.nome)
                );
                setUsername(response.data.usuario.nome);
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: response.data.message,
                    icon: <CheckCircle style={{ color: 'green' }} />,
                });
            })
            .catch((err: AxiosError) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro ao editar cadastro. Verifique sua conexão e tente novamente.',
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
            });
    };

    const getUser = async (
        idUser: number,
        setLoad: Dispatch<React.SetStateAction<boolean>>
    ) => {
        await api
            .get(`usuarios/${idUser}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })
            .then((response) => setCurrentUser(response.data))
            .catch((err) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro ao pesquisar. Verifique sua conexão e tente novamente.',
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
            })
            .finally(() => {
                setLoad(false);
            });
    };

    const getAllUsers = (setLoad: Dispatch<boolean>) => {
        api.get(`usuarios`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response: AxiosResponse) => {
                setUsers([...response.data]);
                setLoad(false);
            })
            .catch((err) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro. Verifique sua conexão e tente novamente.',
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
                setLoad(false);
            });
    };
    const deleteUser = (idUser: number) => {
        api.delete(`usuarios/${idUser}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: 'Sucesso ao deletar.',
                    icon: <CheckCircle style={{ color: 'green' }} />,
                });
                redirect('/configuracoes/usuarios');
            })
            .catch((err) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: `Erro ao excluir. Verifique sua conexão e tente novamente.`,
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
            });
    };
    const changePassword = (idUser: number, data: ChangePasswordData) => {
        api.patch(
            `usuarios/${idUser}/nova-senha`,
            { senha: data.password },
            {
                headers: { Authorization: 'Bearer ' + token },
            }
        )
            .then((res) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: `Senha alterada com sucesso`,
                    duration: 0,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                });
            })
            .catch((err) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro ao excluir. Verifique sua conexão e tente novamente.',
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
            });
    };
    const resetPassword = (
        token: string,
        data: ChangePasswordData,
        navigate: NavigateFunction
    ) => {
        api.post(`usuarios/${token}`, { senha: data.password })
            .then((res) => {
                console.log(res);
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: res.data.message,
                    duration: 0,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                });
            })
            .catch((err) => {
                console.error(err);

                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: err.response.data.message,
                    icon: <WarningCircle style={{ color: '#ef4444' }} />,
                });
            })
            .finally(() => navigate('/'));
    };
    return (
        <UserContext.Provider
            value={{
                newUser,
                editUser,
                deleteUser,
                getUser,
                getAllUsers,
                currentUser,
                users,
                user,
                setUser,
                setCurrentUser,
                changePassword,
                resetPassword,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);
