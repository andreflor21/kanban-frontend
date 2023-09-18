import {
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactNode,
} from 'react';
import { NavigateFunction } from 'react-router-dom';
import { CheckCircle, WarningCircle, X } from 'phosphor-react';
import jwt_decode from 'jwt-decode';
import { Usuario } from '../../types/usuario';
import { notification } from 'antd';
import api from '../../services/api';
import { AxiosError, AxiosResponse } from 'axios';

interface AuthProviderProps {
    children: ReactNode;
}

interface UsuarioLogin {
    email: string;
    senha: string;
}
interface UserForgotPasswordData {
    email: string;
}

interface AuthProviderData {
    userLogin: (
        usuarioLogin: UsuarioLogin,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => void;
    userLogoff: () => void;
    token: string;
    setAuth: (value: React.SetStateAction<string>) => void;
    idUser: number;
    setIdUser: (value: React.SetStateAction<number>) => void;
    user: Usuario;
    setUser: Dispatch<Usuario>;
    userForgotPassword: (data: UserForgotPasswordData) => void;
}

interface DecodedToken {
    sub: string;
    iat: string;
    exp: number;
}
const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const convertStrToNumber = (str: string) => {
        return parseInt(str);
    };
    const [auth, setAuth] = useState<string>(() => {
        const token = localStorage.getItem('@kanban/token');

        if (token) {
            return JSON.parse(token);
        }
        return '';
    });

    const [user, setUser] = useState<Usuario>(() => {
        const userStorage = localStorage.getItem('@kanban/user');

        if (userStorage) {
            return JSON.parse(userStorage);
        }
    });

    const [idUser, setIdUser] = useState<number>(() => {
        const id = localStorage.getItem('@kanban/idUser');

        if (id) {
            return JSON.parse(id);
        }
        return 0;
    });

    const getUser = async (
        id: number | string,
        token: string,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        await api
            .get(`usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                // const navigate = useNavigate();
                setIdUser(res.data.id);
                localStorage.setItem(
                    '@kanban/usuario',
                    JSON.stringify(res.data)
                );
                setUser(res.data);
                notification.open({
                    message: 'sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: 'Login Efetuado com Sucesso!',
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                });
                setLoad(false);
                // getPerfis();
                navigate('/dashboard');
            })
            .catch(() => {
                setLoad(false);
                notification.open({
                    message: 'erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro no login. Verifique seu usuario e senha, tente novamente.',
                    icon: (
                        <WarningCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };
    const userLogin = (
        data: UsuarioLogin,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        api.post('login', data)
            .then((res: AxiosResponse) => {
                localStorage.setItem(
                    '@kanban/token',
                    JSON.stringify(res.data.token)
                );

                const decodedToken: DecodedToken = jwt_decode(res.data.token);
                localStorage.setItem('@kanban/idUser', res.data.user_id);
                setIdUser(convertStrToNumber(decodedToken.sub));
                setAuth(res.data.token);
                getUser(res.data.user_id, res.data.token, setLoad, navigate);
                // getPerfis();
            })
            .catch((err: AxiosError) => {
                setLoad(false);
                console.error(err);

                notification.open({
                    message: 'erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro no login. Verifique seu usuario e senha, tente novamente.',
                    icon: (
                        <WarningCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };
    const userForgotPassword = (data: UserForgotPasswordData) => {
        api.post('esqueci-senha', data)
            .then((res) => {
                console.log(res);

                notification.open({
                    message: 'sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: res.data.message,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                    duration: 2,
                });
            })
            .catch((err: AxiosError) => {
                console.log(err);

                notification.open({
                    message: 'Falha ao recuperar senha',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: err.response?.data?.message,
                    icon: (
                        <WarningCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };
    const userLogoff = () => {
        setUser({} as Usuario);
        setAuth('');
        setIdUser(0);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider
            value={{
                token: auth,
                setAuth,
                userLogin,
                userLogoff,
                idUser,
                setIdUser,
                user,
                setUser,
                userForgotPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
