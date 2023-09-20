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
interface EditUser extends UsuarioData {}
interface ChangePasswordData {
    password: string;
    confirmPassword: string;
}
interface UserProviderData {
    newUser: (
        usuarioData: UsuarioData,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => void;
    deleteUser: (idUser: number) => void;
    editUser: (usuarioData: EditUser) => void;
    getUser: (idUser: number) => void;
    getAllUsers: () => void;
    users: Usuario[];
    user: Usuario;
    currentUser: Usuario;
    setCurrentUser: Dispatch<Usuario>;
    setUser: Dispatch<Usuario>;
    changePassword: (idUser: number, data: ChangePasswordData) => void;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: UserProviderProps) => {
    const { token, idUser, user, setUser } = useAuth();
    const [users, setUsers] = useState<Usuario[]>([]);
    const [currentUser, setCurrentUser] = useState<Usuario>({} as Usuario);

    const newUser = (
        usuarioData: UsuarioData,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        const senha = (Math.random() * Math.pow(10, 6)).toString();
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
                navigate('/dashboard');
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

    const getUser = (idUser: number) => {
        api.get(`usuarios/${idUser}`, {
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
            });
    };

    const getAllUsers = () => {
        api.get(`usuarios`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((response: AxiosResponse) => setUsers([...response.data]))
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
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUsers = () => useContext(UserContext);
