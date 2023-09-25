import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Products from '../pages/Products';
import Orders from '../pages/Orders';
import Kanbans from '../pages/Kanbans';
import Suppliers from '../pages/Suppliers';
import Invoices from '../pages/Invoices';
import Root from './root';
import Users from '../pages/Settings/Users';
import Profile from '../pages/Settings/Profile';
import UserDetails from '../pages/Settings/Users/UserDetails';
import ResetPassword from '../pages/ResetPassword';
import ProfileDetails from '../pages/Settings/Profile/ProfileDetails';
import NewProfile from '../components/NewProfile';
import ProfileForm from '../components/ProfileForm';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <h1>Modulo não habilitado</h1>,
        children: [
            { index: true, element: <Navigate to="/login" /> },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'materiais',
                element: <Products />,
            },
            {
                path: 'pedidos',
                element: <Orders />,
            },
            {
                path: 'kanbans',
                element: <Kanbans />,
            },
            {
                path: 'fornecedores',
                element: <Suppliers />,
            },
            {
                path: 'notas',
                element: <Invoices />,
            },
            {
                path: 'configuracoes',
                children: [
                    {
                        path: 'usuarios',

                        children: [
                            {
                                index: true,
                                element: <Users />,
                            },
                            {
                                path: ':usuarioId',
                                element: <UserDetails />,
                            },
                        ],
                    },
                    {
                        path: 'perfil',

                        children: [
                            { index: true, element: <Profile /> },
                            {
                                path: ':perfilId',
                                element: <ProfileDetails />,
                            },
                            {
                                path: 'novo',
                                element: (
                                    <ProfileForm
                                        action="create"
                                        title="Criar Perfil"
                                    />
                                ),
                            },
                            {
                                path: 'duplicar',
                                element: (
                                    <ProfileForm
                                        action="duplicate"
                                        title="Duplicar Perfil"
                                    />
                                ),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: '/login',
        element: <Login />,
        // action: loginAction,
    },
    {
        path: '/redefinir-senha/:token',
        element: <ResetPassword />,
        // action: loginAction,
    },
]);
