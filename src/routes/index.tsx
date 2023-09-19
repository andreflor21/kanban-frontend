import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './route';
import Settings from '../pages/Settings';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Kanbans from '../pages/Kanbans';
import Suppliers from '../pages/Suppliers';
import Invoices from '../pages/Invoices';
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
                    path="materiais"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="pedidos"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="kanbans"
                    element={
                        <ProtectedRoute>
                            <Kanbans />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="fornecedores"
                    element={
                        <ProtectedRoute>
                            <Suppliers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="notas"
                    element={
                        <ProtectedRoute>
                            <Invoices />
                        </ProtectedRoute>
                    }
                />

                <Route path="configuracoes">
                    <Route
                        path="usuario"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default Rotas;
