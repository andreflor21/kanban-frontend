import {
    createContext,
    useContext,
    useState,
    Dispatch,
    ReactNode,
} from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { CheckCircle, X } from 'phosphor-react';
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

interface AuthProviderData {
    userLogin: (
        usuarioLogin: UsuarioLogin,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => void;
    userLogoff: (navigate: NavigateFunction) => void;
    token: string;
    setAuth: (value: React.SetStateAction<string>) => void;
    idUser: number;
    setIdUser: (value: React.SetStateAction<number>) => void;
    user?: Usuario;
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
        return '';
    });

    const [idUser, setIdUser] = useState<number>(0);

    const getUser = (
        id: number | string,
        token: string,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        api.get(`usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                // const navigate = useNavigate();
                setUser(res.data);
                // localStorage.setItem(
                //     '@kanban/usuario',
                //     JSON.stringify(res.data)
                // );
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
                navigate('/dashboard');
            })
            .catch((err) => {
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
                        <CheckCircle
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
                        <CheckCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };

    const userLogoff = (navigate: NavigateFunction) => {
        setUser({});
        setAuth('');
        setIdUser(0);
        localStorage.clear();
        navigate('/');
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
