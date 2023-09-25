import { Navigate, useLocation } from 'react-router-dom';
import { useUsers } from '../providers/User';
import Aside from '../components/Aside';
import Header from '../components/Header';
import HeaderNavAuth from '../components/HeaderNav';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token } = useUsers();
    const location = useLocation();
    return !token ? (
        <Navigate to={'/login'} state={{ from: location }} replace />
    ) : (
        <>
            <Header auth={true}>
                <HeaderNavAuth />
            </Header>
            <Aside />
            {children}
        </>
    );
};

export default ProtectedRoute;
