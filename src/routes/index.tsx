import { HashRouter, Routes as Rotas, Route } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../providers/Auth';

const Routes = () => {
    const { token } = useAuth();

    return (
        <Rotas>
            <Route path="/" element={<h1>HOME</h1>} />
            <Route path="/login" element={<Login />} />
        </Rotas>
    );
};

export default Routes;
