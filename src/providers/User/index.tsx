// import api from "@/services/api"
// import type { DecodedToken } from "@/stores/User/useUserStore"
// import type { Perfil } from "@/types/perfil"
// import type { User, UsuarioData } from "@/types/usuario"
// import { notification } from "antd"
// import type { AxiosError, AxiosResponse } from "axios"
// import jwt_decode from "jwt-decode"
// import { CheckCircle, WarningCircle, X } from "phosphor-react"
// import {
// 	type Dispatch,
// 	type ReactNode,
// 	createContext,
// 	useContext,
// 	useState,
// } from "react"
// import { type NavigateFunction, redirect } from "react-router-dom"
//
// interface UserProviderProps {
// 	children: ReactNode
// }
//
// interface EditUser extends Omit<UsuarioData, "id"> {}
//
// interface UserLogin {
// 	email: string
// 	senha: string
// }
// interface UserForgotPasswordData {
// 	email: string
// }
//
// interface ChangePasswordData {
// 	password: string
// 	confirmPassword: string
// }
//
// interface UserProviderData {
// 	newUser: (
// 		usuarioData: EditUser,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => void
// 	deleteUser: (idUser: number) => void
// 	editUser: (usuarioData: EditUser) => void
// 	getUser: (
// 		idUser: number,
// 		setLoad: Dispatch<React.SetStateAction<boolean>>,
// 	) => void
// 	getAllUsers: (setLoad?: Dispatch<boolean>) => void
// 	users: User[]
// 	user: User
// 	currentUser: User
// 	setCurrentUser: Dispatch<User>
// 	setUser: Dispatch<User>
// 	changePassword: (idUser: number, data: ChangePasswordData) => void
// 	resetPassword: (
// 		token: string,
// 		data: ChangePasswordData,
// 		navigate: NavigateFunction,
// 	) => void
// 	userLogin: (
// 		usuarioLogin: UserLogin,
// 		setLoad: Dispatch<boolean>,
// 		setProfiles: Dispatch<Perfil[]>,
// 		navigate: NavigateFunction,
// 	) => void
// 	userLogoff: () => void
// 	userForgotPassword: (data: UserForgotPasswordData) => void
// 	token: string
// 	setAuth: (value: React.SetStateAction<string>) => void
// 	idUser: number
// 	setUsername: (value: React.SetStateAction<string>) => void
// 	username: string
// 	setIdUser: (value: React.SetStateAction<number>) => void
// }
//
// const UserContext = createContext<UserProviderData>({} as UserProviderData)
//
// export const UserProvider = ({ children }: UserProviderProps) => {
// 	const [users, setUsers] = useState<User[]>([])
// 	const [currentUser, setCurrentUser] = useState<User>({} as User)
// 	const convertStrToNumber = (str: string) => {
// 		return Number.parseInt(str)
// 	}
// 	const [auth, setAuth] = useState<string>(() => {
// 		const token = localStorage.getItem("@kanban/token")
//
// 		if (token) {
// 			return JSON.parse(token)
// 		}
// 		return ""
// 	})
// 	const [username, setUsername] = useState<string>(() => {
// 		const name = localStorage.getItem("@kanban/usuario")
//
// 		if (name) {
// 			return JSON.parse(name)
// 		}
// 		return ""
// 	})
//
// 	const [user, setUser] = useState<User>({} as User)
//
// 	const [idUser, setIdUser] = useState<number>(() => {
// 		const id = localStorage.getItem("@kanban/idUser")
//
// 		if (id) {
// 			return JSON.parse(id)
// 		}
// 		return 0
// 	})
//
// 	const newUser = (
// 		usuarioData: EditUser,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => {
// 		const senha = Math.round(Math.random() * 10 ** 6).toString()
// 		const dtNascimento = usuarioData.dtNascimento
// 			? usuarioData.dtNascimento
// 			: null
// 		const user: EditUser = {
// 			...usuarioData,
// 			dtNascimento,
// 			senha,
// 			trocaSenha: true,
// 		}
//
// 		api
// 			.post("usuarios/novo", user, {
// 				headers: { Authorization: `Bearer ${auth}` },
// 			})
// 			.then((res: AxiosResponse) => {
// 				console.log(res.data)
//
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: `Usuário criado com sucesso! Senha temporária ${senha}`,
// 					duration: 0,
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 				setUsers([...users, res.data])
// 				setLoad(false)
// 			})
// 			.catch((err: AxiosError) => {
// 				console.error(err)
// 				setLoad(false)
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro no cadastro do usuário, verifique os dados e tente novamente.",
// 					icon: <CheckCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
//
// 	const editUser = (usuarioData: EditUser) => {
// 		console.log(usuarioData)
// 		api
// 			.patch(`usuarios/${idUser}`, usuarioData, {
// 				headers: { Authorization: `Bearer ${auth}` },
// 			})
// 			.then((response: AxiosResponse) => {
// 				setUser(response.data.usuario)
// 				localStorage.setItem(
// 					"@kanban/usuario",
// 					JSON.stringify(response.data.usuario.nome),
// 				)
// 				setUsername(response.data.usuario.nome)
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: response.data.message,
// 					icon: <CheckCircle style={{ color: "green" }} />,
// 				})
// 			})
// 			.catch((err: AxiosError) => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao editar cadastro. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 	}
//
// 	const getUser = async (
// 		idUser: number,
// 		setLoad: Dispatch<React.SetStateAction<boolean>>,
// 	) => {
// 		await api
// 			.get(`usuarios/${idUser}`, {
// 				headers: {
// 					Authorization: `Bearer ${auth}`,
// 				},
// 			})
// 			.then((response) => setCurrentUser(response.data))
// 			.catch((err) => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao pesquisar. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 			.finally(() => {
// 				setLoad(false)
// 			})
// 	}
//
// 	const getAllUsers = (setLoad: Dispatch<boolean>) => {
// 		api
// 			.get("usuarios", {
// 				headers: {
// 					Authorization: `Bearer ${auth}`,
// 				},
// 			})
// 			.then((response: AxiosResponse) => {
// 				setUsers(response.data)
// 				setLoad(false)
// 			})
// 			.catch((err) => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao carregar usuários. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 				setLoad(false)
// 			})
// 	}
//
// 	const deleteUser = (idUser: number) => {
// 		api
// 			.delete(`usuarios/${idUser}`, {
// 				headers: {
// 					Authorization: `Bearer ${auth}`,
// 				},
// 			})
// 			.then((response) => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Sucesso ao deletar.",
// 					icon: <CheckCircle style={{ color: "green" }} />,
// 				})
// 				redirect("/configuracoes/usuarios")
// 			})
// 			.catch((err) => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao excluir. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 	}
//
// 	const changePassword = (idUser: number, data: ChangePasswordData) => {
// 		api
// 			.patch(
// 				`usuarios/${idUser}/nova-senha`,
// 				{ senha: data.password },
// 				{
// 					headers: { Authorization: `Bearer ${auth}` },
// 				},
// 			)
// 			.then((res) => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Senha alterada com sucesso",
// 					duration: 0,
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 			})
// 			.catch((err) => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao excluir. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 	}
//
// 	const resetPassword = (
// 		token: string,
// 		data: ChangePasswordData,
// 		navigate: NavigateFunction,
// 	) => {
// 		api
// 			.post(`usuarios/${token}`, { senha: data.password })
// 			.then((res) => {
// 				console.log(res)
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: res.data.message,
// 					duration: 0,
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 			})
// 			.catch((err) => {
// 				console.error(err)
//
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: err.response.data.message,
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 			.finally(() => navigate("/"))
// 	}
//
// 	const getUserLogin = async (
// 		id: number | string,
// 		token: string,
// 		setLoad: Dispatch<boolean>,
// 		setProfiles: Dispatch<Perfil[]>,
// 		navigate: NavigateFunction,
// 	) => {
// 		await api
// 			.get(`usuarios/${id}`, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then((res) => {
// 				// const navigate = useNavigate();
// 				// setIdUser(res.data.id);
// 				if (res.data.nome) {
// 					localStorage.setItem("@kanban/usuario", JSON.stringify(res.data.nome))
// 					setUsername(res.data.nome)
// 				}
// 				setUser(res.data)
// 			})
// 			.then(() => {
// 				api
// 					.get("usuarios", {
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					})
// 					.then((response: AxiosResponse) => {
// 						setUsers(response.data)
// 						setLoad(false)
// 					})
// 					.catch((err) => {
// 						notification.open({
// 							message: "Erro",
// 							closeIcon: <X />,
// 							style: {
// 								WebkitBorderRadius: 4,
// 							},
// 							description:
// 								"Erro ao carregar usuários. Verifique sua conexão e tente novamente.",
// 							icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 						})
// 						setLoad(false)
// 					})
// 			})
// 			.then(() => {
// 				api
// 					.get("perfil", {
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					})
// 					.then((response: AxiosResponse) => {
// 						setProfiles(response.data)
// 						setLoad(false)
// 					})
// 					.catch((err: AxiosError) => {
// 						console.error(err)
// 						notification.open({
// 							message: "Erro",
// 							closeIcon: <X />,
// 							style: {
// 								WebkitBorderRadius: 4,
// 							},
// 							description:
// 								"Erro ao carregar perfis. Verifique sua conexão e tente novamente.",
// 							icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 						})
// 					})
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Login Efetuado com Sucesso!",
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 				navigate("/dashboard")
// 			})
// 			.catch(() => {
// 				setLoad(false)
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro no login. Verifique seu usuario e senha, tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
//
// 	const userLogin = (
// 		data: UserLogin,
// 		setLoad: Dispatch<boolean>,
// 		setProfiles: Dispatch<Perfil[]>,
// 		navigate: NavigateFunction,
// 	) => {
// 		api
// 			.post("login", data)
// 			.then((res: AxiosResponse) => {
// 				localStorage.setItem("@kanban/token", JSON.stringify(res.data.token))
//
// 				const decodedToken: DecodedToken = jwt_decode(res.data.token)
// 				localStorage.setItem("@kanban/idUser", res.data.user_id)
// 				setIdUser(convertStrToNumber(decodedToken.sing.id))
// 				setAuth(res.data.token)
// 				getUserLogin(
// 					res.data.user_id,
// 					res.data.token,
// 					setLoad,
// 					setProfiles,
// 					navigate,
// 				)
// 			})
// 			.catch((err: AxiosError) => {
// 				setLoad(false)
// 				console.error(err)
//
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro no login. Verifique seu usuario e senha, tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
//
// 	const userForgotPassword = (data: UserForgotPasswordData) => {
// 		api
// 			.post("esqueci-senha", data)
// 			.then((res) => {
// 				console.log(res)
//
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: res.data.message,
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 					duration: 2,
// 				})
// 			})
// 			.catch((err: AxiosError) => {
// 				console.log(err)
//
// 				notification.open({
// 					message: "Falha ao recuperar senha",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Erro ao recuperar senha, tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
//
// 	const userLogoff = () => {
// 		setUser({} as User)
// 		setAuth("")
// 		setIdUser(0)
// 		localStorage.clear()
// 	}
//
// 	return (
// 		<UserContext.Provider
// 			value={{
// 				newUser,
// 				editUser,
// 				deleteUser,
// 				getUser,
// 				getAllUsers,
// 				setUser,
// 				setCurrentUser,
// 				changePassword,
// 				resetPassword,
// 				setAuth,
// 				setIdUser,
// 				setUsername,
// 				currentUser,
// 				users,
// 				user,
// 				token: auth,
// 				userLogin,
// 				userLogoff,
// 				idUser,
// 				userForgotPassword,
// 				username,
// 			}}
// 		>
// 			{children}
// 		</UserContext.Provider>
// 	)
// }
//
// export const useUsers = () => useContext(UserContext)
