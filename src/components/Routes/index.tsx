import React, { useEffect, useState } from 'react';
import { Container, ListHeader, ListStyled } from './styles';
import { useAuth } from '../../providers/Auth';
import { Switch } from 'antd';
import api from '../../services/api';
interface RoutesProps {
    profileId?: string;
}

interface Route {
    id: number;
    descricao: string;
    caminho: string;
    metodo: string;
}
const Routes = ({ profileId }: RoutesProps) => {
    const { token } = useAuth();
    const [routes, setRoutes] = useState<Route[]>([]);
    useEffect(() => {
        api.get('rotas', { headers: { Authorization: 'Bearer ' + token } })
            .then((res) => setRoutes(res.data))
            .catch((e) => console.error(e));
    }, []);
    const handleChange = (checked: boolean, routeId: number) => {
        console.log(
            `Rota ${routeId} ${checked ? 'habilitada' : 'desabilitada'}`
        );
    };
    return (
        <Container>
            <ListHeader>
                <span>Módulo</span>
                <span>Habilitado</span>
            </ListHeader>
            <ListStyled>
                {routes.map((r) => (
                    <li key={r.id}>
                        <div>
                            <span>{r.descricao}</span>
                            <Switch
                                onChange={(checked: boolean) =>
                                    handleChange(checked, r.id)
                                }
                            />
                        </div>
                    </li>
                ))}
            </ListStyled>
        </Container>
    );
};

export default Routes;
