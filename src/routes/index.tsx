import { Navigate, createBrowserRouter } from "react-router-dom"

import Root from "./root"

import ProfileForm from "@/components/ProfileForm"
import SecitonForm from "@/components/SectionForm"
import Dashboard from "@/pages/Dashboard"
import Invoices from "@/pages/Invoices"
import Kanbans from "@/pages/Kanbans"
import Login from "@/pages/Login"
import Orders from "@/pages/Orders"
import Products from "@/pages/Products"
import ResetPassword from "@/pages/ResetPassword"
import Section from "@/pages/Section"
import Profile from "@/pages/Settings/Profile"
import ProfileDetails from "@/pages/Settings/Profile/ProfileDetails"
import Users from "@/pages/Settings/Users"
import UserDetails from "@/pages/Settings/Users/UserDetails"
import Suppliers from "@/pages/Suppliers"

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <h1>Modulo não habilitado</h1>,
		children: [
			{ index: true, element: <Navigate to="/login" /> },
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "materiais",
				element: <Products />,
			},
			{
				path: "pedidos",
				element: <Orders />,
			},
			{
				path: "kanbans",
				element: <Kanbans />,
			},
			{
				path: "fornecedores",
				children: [
					{
						index: true,
						element: <Suppliers />,
					},
					{
						path: ":fornId",
						element: <h1>Forn DETALHE</h1>,
					},
					{
						path: "novo",
						element: <h1>SECAO DETALHE</h1>,
					},
					{
						path: "tipos",
						children: [{ index: true, element: <h1>Tipos de forn</h1> }],
					},
				],
			},
			{
				path: "secoes",
				children: [
					{
						index: true,
						element: <Section />,
					},
					{
						path: ":secaoId",
						element: <SecitonForm title="Editar Seção" action="edit" />,
					},
					{
						path: "novo",
						element: <SecitonForm title="Nava Seção" action="create" />,
					},
					{
						path: "tipos",
						children: [{ index: true, element: <h1>Tipos de secao</h1> }],
					},
				],
			},
			{
				path: "notas",
				element: <Invoices />,
			},
			{
				path: "configuracoes",
				children: [
					{
						path: "usuarios",

						children: [
							{
								index: true,
								element: <Users />,
							},
							{
								path: ":usuarioId",
								element: <UserDetails />,
							},
						],
					},
					{
						path: "perfil",

						children: [
							{ index: true, element: <Profile /> },
							{
								path: ":perfilId",
								element: <ProfileDetails />,
							},
							{
								path: "novo",
								element: <ProfileForm action="create" title="Criar Perfil" />,
							},
							{
								path: "duplicar",
								element: (
									<ProfileForm action="duplicate" title="Duplicar Perfil" />
								),
							},
						],
					},
					{ path: "importar", element: <h1>Importar</h1> },
					{ path: "exportar", element: <h1>Exportar</h1> },
				],
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
		// action: loginAction,
	},
	{
		path: "/reset-password/:token",
		element: <ResetPassword />,
		// action: loginAction,
	},
])
