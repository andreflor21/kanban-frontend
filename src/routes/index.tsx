import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import { useAuth } from '../providers/Auth';
import { Dashboard } from '../pages/Dashboard';
import { FormUsuario } from '../components/UsuarioForm';

const Rotas = () => {
    const { token } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {token ? (
                <Route path="/usuario" element={<FormUsuario />} />
            ) : (
                <Route path="/xxxx" element={<Dashboard />} />
                // <Navigate to="/" replace={true} />
            )}
        </Routes>
    );
};

export default Rotas;
