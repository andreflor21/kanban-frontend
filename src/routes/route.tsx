import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import Aside from '../components/Aside';
import Header from '../components/Header';
import HeaderNavAuth from '../components/HeaderNav';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token } = useAuth();
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
