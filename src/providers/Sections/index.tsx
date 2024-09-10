import { notification } from "antd"
import type { AxiosError, AxiosResponse } from "axios"
import { CheckCircle, WarningCircle, X } from "phosphor-react"
import {
	type Dispatch,
	type ReactNode,
	createContext,
	useContext,
	useState,
} from "react"
import type { NavigateFunction } from "react-router-dom"

import type { Section, SectionData } from "@/types/secao"
import api from "../../services/api"
import { useUsers } from "../User"

interface SectionProviderProps {
	children: ReactNode
}

interface SectionProviderData {
	newSection: (
		sectionData: SectionData,
		setLoad: Dispatch<boolean>,
		navigate: NavigateFunction,
	) => void
	handleSection: (active: boolean, idSection: string) => void
	deleteSection: (idSection: string) => void
	editSection: (sectionData: SectionData, idSection: string) => void
	getSection: (idSection: string) => void
	getSections: (setLoad?: Dispatch<boolean>) => void
	sections: Section[]
	section: Section
	setSections: Dispatch<Section[]>
	setSection: Dispatch<Section>
}

const SectionContext = createContext<SectionProviderData>(
	{} as SectionProviderData,
)

export const SectionProvider = ({ children }: SectionProviderProps) => {
	const { token } = useUsers()
	const [sections, setSections] = useState<Section[]>([])
	const [section, setSection] = useState<Section>({} as Section)

	const getSections = (setLoad: Dispatch<boolean>) => {
		api
			.get("secoes", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				setSections(res.data)
				setLoad(false)
			})
			.catch(() => {
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description:
						"Erro ao carregar seções. Verifique sua conexão e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} />,
				})
			})
	}

	const getSection = (idSection: string) => {
		api
			.get(`secoes/${idSection}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				setSection(res.data)
			})
			.catch((err: AxiosError) => {
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: "Erro. Verifique sua conexão e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} />,
				})
			})
	}

	const newSection = (
		sectionData: SectionData,
		setLoad: Dispatch<boolean>,
		navigate: NavigateFunction,
	) => {
		api
			.post("secoes/novo", sectionData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				notification.open({
					message: "Sucesso",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: "Seção criado com sucesso!",
					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
				})
				setLoad(false)
				navigate("/secoes")
			})
			.catch((err: AxiosError) => {
				setLoad(false)
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description:
						"Erro no cadastro do perfil, verifique os dados e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
				})
			})
	}

	const editSection = (sectionData: SectionData, idSection: string) => {
		api
			.patch(`secoes/${idSection}`, sectionData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res: AxiosResponse) => {
				notification.open({
					message: "Sucesso",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: "Seção atualizada com sucesso!",
					icon: <CheckCircle style={{ color: "#22c55e" }} weight="fill" />,
				})
			})
			.catch((err: AxiosError) => {
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description:
						"Erro no cadastro da seção, verifique os dados e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} weight="fill" />,
				})
			})
	}

	const deleteSection = (idSection: string) => {
		api
			.delete(`secoes/${idSection}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((_: AxiosResponse) => {
				notification.open({
					message: "Sucesso",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: "Sucesso ao deletar.",
					icon: <CheckCircle style={{ color: "#22c55e" }} />,
				})
			})
			.catch((err: AxiosError) => {
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description:
						"Erro ao excluir. Verifique sua conexão e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} />,
				})
			})
	}
	const handleSection = (active: boolean, idSection: string) => {
		api
			.put(
				`secoes/${idSection}`,
				{ ativo: active },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((_: AxiosResponse) => {
				notification.open({
					message: "Sucesso",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: `Seção ${active ? "Ativada" : "Desativada"}`,
					icon: <CheckCircle style={{ color: "#22c55e" }} />,
				})
			})
			.catch((err: AxiosError) => {
				notification.open({
					message: "Erro",
					closeIcon: <X />,
					style: {
						WebkitBorderRadius: 4,
					},
					description: "Erro. Verifique sua conexão e tente novamente.",
					icon: <WarningCircle style={{ color: "#ef4444" }} />,
				})
			})
	}
	return (
		<SectionContext.Provider
			value={{
				section,
				sections,
				getSection,
				getSections,
				newSection,
				editSection,
				deleteSection,
				handleSection,
				setSection,
				setSections,
			}}
		>
			{children}
		</SectionContext.Provider>
	)
}

export const useSection = () => useContext(SectionContext)
