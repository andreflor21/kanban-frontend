import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/Auth';
import Aside from '../components/Aside';

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { token } = useAuth();
    const location = useLocation();
    return !token ? (
        <Navigate to={'/login'} state={{ from: location }} replace />
    ) : (
        <>
            <Aside />
            {children}
        </>
    );
};

export default ProtectedRoute;
