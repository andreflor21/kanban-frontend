import { Navigate, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Aside from '../components/Aside';
import HeaderNavAuth from '../components/HeaderNav';
import { useUsers } from '../providers/User';
const Root = () => {
    const { token } = useUsers();
    return token ? (
        <>
            <Header>
                <HeaderNavAuth />
            </Header>
            <Aside />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" /> // Mostrar pagina de não autorizado e colocar um botao para redirecionar a tela de Login
    );
};

export default Root;