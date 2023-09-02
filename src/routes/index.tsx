import { HashRouter, Routes as Rotas, Route } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../providers/Auth';
import { Dashboard } from '../components/Dashboard';

const Routes = () => {
    const { token } = useAuth();

    return (
        <Rotas>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
        </Rotas>
    );
};

export default Routes;
