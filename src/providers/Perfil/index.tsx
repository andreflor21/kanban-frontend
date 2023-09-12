import {
    createContext,
    useContext,
    useEffect,
    useState,
    Dispatch,
    ReactNode,
} from 'react';
import { Perfil } from '../../types/perfil';
import api from '../../services/api';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from '../Auth';
import { notification } from 'antd';
import { CheckCircle, X } from 'phosphor-react';
import { AxiosError, AxiosResponse } from 'axios';

interface PerfilProviderProps {
    children: ReactNode;
}

interface PerfilProviderData {
    newPerfil: (
        perfilData: Perfil,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => void;
    deletePerfil: (idPerfil: number) => void;
    editPerfil: (perfilData: Perfil, idPerfil: number) => void;
    getPerfil: (idPerfil: number) => void;
    getPerfis: () => void;
    perfis: Perfil[];
    perfil: Perfil;
}

const PerfilContext = createContext<PerfilProviderData>(
    {} as PerfilProviderData
);

export const PerfilProvider = ({ children }: PerfilProviderProps) => {
    const { token } = useAuth();
    const [perfis, setPerfis] = useState<Perfil[]>([]);
    const [perfil, setPerfil] = useState<Perfil>({} as Perfil);

    const getPerfis = () => {
        api.get('perfil', {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res: AxiosResponse) => {
                setPerfis(res.data);
            })
            .catch((err: AxiosError) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro. Verifique sua conexão e tente novamente.',
                    icon: <CheckCircle style={{ color: 'red' }} />,
                });
            });
    };

    useEffect(() => {
        if (token) {
            getPerfis();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const getPerfil = (idPerfil: number) => {
        api.get(`perfil/${idPerfil}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res: AxiosResponse) => {
                setPerfil(res.data);
            })
            .catch((err: AxiosError) => {
                notification.open({
                    message: 'Erro',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description:
                        'Erro. Verifique sua conexão e tente novamente.',
                    icon: <CheckCircle style={{ color: 'red' }} />,
                });
            });
    };

    const newPerfil = (
        perfilData: Perfil,
        setLoad: Dispatch<boolean>,
        navigate: NavigateFunction
    ) => {
        api.post('perfil/novo', perfilData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res: AxiosResponse) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: `Perfil criado com sucesso!`,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
                });
                setLoad(false);
                navigate('dashboard');
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
                        'Erro no cadastro do perfil, verifique os dados e tente novamente.',
                    icon: (
                        <CheckCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };
    const editPerfil = (perfilData: Perfil, idPerfil: number) => {
        api.patch(`perfil/${idPerfil}`, perfilData, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((res: AxiosResponse) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: `Perfil atualizado com sucesso!`,
                    icon: (
                        <CheckCircle
                            style={{ color: '#22c55e' }}
                            weight="fill"
                        />
                    ),
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
                        'Erro no cadastro do perfil, verifique os dados e tente novamente.',
                    icon: (
                        <CheckCircle
                            style={{ color: '#ef4444' }}
                            weight="fill"
                        />
                    ),
                });
            });
    };

    const deletePerfil = (idPerfil: number) => {
        api.delete(`perfil/${idPerfil}`, {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        })
            .then((_: AxiosResponse) => {
                notification.open({
                    message: 'Sucesso',
                    closeIcon: <X />,
                    style: {
                        WebkitBorderRadius: 4,
                    },
                    description: 'Sucesso ao deletar.',
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
                        'Erro ao excluir. Verifique sua conexão e tente novamente.',
                    icon: <CheckCircle style={{ color: 'red' }} />,
                });
            });
    };
    return (
        <PerfilContext.Provider
            value={{
                perfil,
                perfis,
                getPerfil,
                getPerfis,
                newPerfil,
                editPerfil,
                deletePerfil,
            }}
        >
            {children}
        </PerfilContext.Provider>
    );
};

export const usePerfil = () => useContext(PerfilContext);
