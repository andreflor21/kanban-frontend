import { StatusTag } from "@/components/StatusTag"
import { formatDate } from "@/helpers/dates"
import { hashCPF } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { ProfileTag } from "@/pages/Settings/Users/UserList/helpers"
import { type ErrorExtended, parseError } from "@/services/api"
import { useGetAllUsers, useGetUsersActions } from "@/services/userServices"
import { Button, Drawer } from "antd"
import { Trash } from "phosphor-react"
import type React from "react"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

const LineTitle = ({ children }: { children: React.ReactNode }) => {
	return (
		<p>
			<strong>{children}</strong>
		</p>
	)
}

export const UserDetails = () => {
	const { data: users, query } = useGetAllUsers()
	const [searchParams, setSearchParams] = useSearchParams()
	const userId = searchParams.get("user_id") ?? ""
	const user = users?.users.find((u) => u.id === userId)
	const { deleteUser } = useGetUsersActions()
	const [isDeleting, setIsDeleting] = useState(false)
	const { showNotification } = useGetNotification()

	if (!user && !!userId) {
		setSearchParams((params) => {
			params.delete("user_id")
			return params
		})
		return null
	}

	const userCPF = user?.cpf
	const userBirthDate = user?.birthdate
	const hashedCPF = userCPF ? hashCPF(userCPF) : ""

	const handleNotification = (
		type: "SUCCESS" | "ERROR",
		description?: string | null,
	) => {
		showNotification({
			type,
			description:
				type === "SUCCESS"
					? "Usuário deletado com sucesso"
					: (description ?? "Erro ao deletar usuário"),
			message: type === "SUCCESS" ? "Sucesso" : "Erro",
		})
	}

	const handleDeleteUser = async () => {
		if (!user) return
		setIsDeleting(true)
		try {
			await deleteUser(user.id)
			await query.refetch()
			handleNotification("SUCCESS")
		} catch (error) {
			const parsedError = parseError(error as ErrorExtended)
			handleNotification("ERROR", parsedError)
		} finally {
			setIsDeleting(false)
			setSearchParams((params) => {
				params.delete("user_id")
				return params
			})
		}
	}

	return (
		<>
			<Drawer
				title="Detalhes do Usuário"
				open={!!user}
				onClose={() =>
					setSearchParams((params) => {
						params.delete("user_id")
						return params
					})
				}
			>
				<S.UserDetailsWrapper>
					<S.InfoLine>
						<LineTitle>Nome:</LineTitle>
						<span>{user?.name}</span>
					</S.InfoLine>
					<S.InfoLine>
						<LineTitle>Email:</LineTitle>
						<span>{user?.email}</span>
					</S.InfoLine>
					{hashedCPF && (
						<S.InfoLine>
							<LineTitle>CPF:</LineTitle>
							<span>{hashedCPF}</span>
						</S.InfoLine>
					)}
					{userBirthDate && (
						<S.InfoLine>
							<LineTitle>Data de Nascimento:</LineTitle>
							<span>{formatDate({ date: userBirthDate })}</span>
						</S.InfoLine>
					)}
					<S.InfoLine>
						<LineTitle>Perfil:</LineTitle>
						<ProfileTag
							profile={user?.profile?.description ?? "Desconhecido"}
						/>
					</S.InfoLine>
					<S.InfoLine>
						<LineTitle>Status:</LineTitle>
						<StatusTag active={!!user?.active} />
					</S.InfoLine>
					<S.InfoLine>
						<LineTitle>Criado em:</LineTitle>
						<span>
							{formatDate({
								date: user?.createdAt,
								showHours: true,
							})}
						</span>
					</S.InfoLine>
				</S.UserDetailsWrapper>
				<S.DeleteWrapper>
					<Button
						loading={isDeleting}
						onClick={handleDeleteUser}
						danger
						icon={<Trash />}
					>
						Deletar Usuário
					</Button>
				</S.DeleteWrapper>
			</Drawer>
		</>
	)
}
