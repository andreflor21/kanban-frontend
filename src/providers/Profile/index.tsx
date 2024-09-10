// import { useUserStore } from "@/stores/User/useUserStore"
// import type { Perfil, PerfilData } from "@/types/perfil"
// import { notification } from "antd"
// import type { AxiosResponse } from "axios"
// import { CheckCircle, WarningCircle, X } from "phosphor-react"
// import {
// 	type Dispatch,
// 	type ReactNode,
// 	createContext,
// 	useContext,
// 	useState,
// } from "react"
// import type { NavigateFunction } from "react-router-dom"
// import api from "../../services/api"
//
// // import { useUsers } from "../User"
//
// interface PerfilProviderProps {
// 	children: ReactNode
// }
//
// interface PerfilProviderData {
// 	newProfile: (
// 		perfilData: PerfilData,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => void
// 	duplicateProfile: (
// 		perfilData: PerfilData,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => void
// 	deleteProfile: (idPerfil: number) => void
// 	editProfile: (perfilData: PerfilData, idPerfil: number) => void
// 	getProfile: (idPerfil: number) => void
// 	getProfiles: (setLoad?: Dispatch<boolean>) => void
// 	profiles: Perfil[]
// 	profile: Perfil
// 	setProfiles: Dispatch<Perfil[]>
// 	setProfile: Dispatch<Perfil>
// }
//
// const PerfilContext = createContext<PerfilProviderData>(
// 	{} as PerfilProviderData,
// )
//
// export const PerfilProvider = ({ children }: PerfilProviderProps) => {
// 	// const { token } = useUsers()
// 	const token = useUserStore((state) => state.token)
// 	const [profiles, setProfiles] = useState<Perfil[]>([])
// 	const [profile, setProfile] = useState<Perfil>({} as Perfil)
//
// 	const getProfiles = (setLoad: Dispatch<boolean>) => {
// 		api
// 			.get("perfil", {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then((res: AxiosResponse) => {
// 				setProfiles(res.data)
// 				setLoad(false)
// 			})
// 			.catch(() => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro ao carregar perfis. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 	}
//
// 	const getProfile = (idPerfil: number) => {
// 		api
// 			.get(`perfil/${idPerfil}`, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then((res: AxiosResponse) => {
// 				setProfile(res.data)
// 			})
// 			.catch(() => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Erro. Verifique sua conexão e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} />,
// 				})
// 			})
// 	}
//
// 	const newProfile = (
// 		perfilData: PerfilData,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => {
// 		api
// 			.post("perfil/novo", perfilData, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then(() => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Perfil criado com sucesso!",
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 				setLoad(false)
// 				navigate("/configuracoes/perfil")
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
// 						"Erro no cadastro do perfil, verifique os dados e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
// 	const duplicateProfile = (
// 		perfilData: PerfilData,
// 		setLoad: Dispatch<boolean>,
// 		navigate: NavigateFunction,
// 	) => {
// 		api
// 			.post("perfil/duplicar", perfilData, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then((res: AxiosResponse) => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Perfil criado com sucesso!",
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 				setLoad(false)
// 				navigate(`/configuracoes/perfil/${res.data.id}`)
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
// 						"Erro no cadastro do perfil, verifique os dados e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
// 	const editProfile = (perfilData: PerfilData, idPerfil: number) => {
// 		api
// 			.patch(`perfil/${idPerfil}`, perfilData, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then(() => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Perfil atualizado com sucesso!",
// 					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
// 				})
// 			})
// 			.catch(() => {
// 				notification.open({
// 					message: "Erro",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description:
// 						"Erro no cadastro do perfil, verifique os dados e tente novamente.",
// 					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
// 				})
// 			})
// 	}
//
// 	const deleteProfile = (idPerfil: number) => {
// 		api
// 			.delete(`perfil/${idPerfil}`, {
// 				headers: {
// 					Authorization: `Bearer ${token}`,
// 				},
// 			})
// 			.then((_: AxiosResponse) => {
// 				notification.open({
// 					message: "Sucesso",
// 					closeIcon: <X />,
// 					style: {
// 						WebkitBorderRadius: 4,
// 					},
// 					description: "Sucesso ao deletar.",
// 					icon: <CheckCircle style={{ color: "#22c55e" }} />,
// 				})
// 			})
// 			.catch(() => {
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
// 	return (
// 		<PerfilContext.Provider
// 			value={{
// 				profile,
// 				profiles,
// 				getProfile,
// 				getProfiles,
// 				newProfile,
// 				editProfile,
// 				deleteProfile,
// 				setProfile,
// 				setProfiles,
// 				duplicateProfile,
// 			}}
// 		>
// 			{children}
// 		</PerfilContext.Provider>
// 	)
// }
//
// export const useProfile = () => useContext(PerfilContext)
