import Button from '../../components/Button';
import { useAuth } from '../../providers/Auth';
import { useNavigate } from 'react-router-dom';
import { FormUsuario } from '../../components/UsuarioForm';
export const Dashboard = () => {
    const { userLogoff } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <h1>Dashboard</h1>
            <FormUsuario />
            <Button type="button" onClickFunc={() => userLogoff(navigate)}>
                Sair
            </Button>
        </>
    );
};
