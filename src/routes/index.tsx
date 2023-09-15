import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './route';
import Settings from '../pages/Settings';
const Rotas = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index Component={Login} />
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="configuracoes"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Rotas;
