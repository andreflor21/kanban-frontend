import { useGetProfiles } from "@/services/profileServices"
import { useGetAllUsers, useGetUsersActions } from "@/services/userServices"
import type { User } from "@/types/usuario"
import { Drawer, Popconfirm, Table, type TableColumnsType } from "antd"

import { UserForm } from "@/components/NewUser/UserForm"
import { useGetNotification } from "@/hooks/useGetNotification"
import { UserDetails } from "@/pages/Settings/Users/UserList/UserDetails"
import { getDataToShow } from "@/pages/Settings/Users/UserList/helpers"
import { type ErrorExtended, parseError } from "@/services/api"
import { useUserStore } from "@/stores/User/useUserStore"
import { Eye, Pencil, Trash } from "phosphor-react"
import type React from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

export type TableDataType =
	| {
			id: string
			name: string
			email: React.ReactNode
			active: React.ReactNode
			profileTag: React.ReactNode
			profileId: string
			nameDisplay: React.ReactNode
			user: User
	  }
	| undefined

export const UserList = () => {
	const { data: users, isLoading: isLoadingUsers, query } = useGetAllUsers()
	const { data: profiles } = useGetProfiles()
	const user = useUserStore((state) => state.user)
	const [searchParams, setSearchParams] = useSearchParams()
	const querySearch = searchParams.get("user") ?? ""
	const { deleteUser } = useGetUsersActions()
	const { showNotification } = useGetNotification()

	const isLoading = isLoadingUsers

	const dataToShow = getDataToShow(users?.users, querySearch, user)

	const handleDelete = async (id: string): Promise<void> => {
		try {
			await deleteUser(id)
			await query.refetch()
			showNotification({
				message: "Usuário deletado com sucesso",
				description: "O usuário foi deletado com sucesso",
				type: "SUCCESS",
			})
		} catch (error) {
			const parsedError = parseError(error as ErrorExtended)
			showNotification({
				message: "Erro ao deletar usuário",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		}
	}

	const onEdit = (id: string) => {
		setSearchParams((params) => {
			params.set("user_edit", id)
			return params
		})
	}
	const isModalOpen = searchParams.get("user_edit") ?? false
	const userToEdit =
		users?.users.find((u) => u.id === searchParams.get("user_edit")) ?? null
	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("user_edit")
			return params
		})
	}

	const handleShowDetails = (id: string) => {
		setSearchParams((params) => {
			params.set("user_id", id)
			return params
		})
	}

	const getColumns = (): TableColumnsType<TableDataType> => {
		return [
			{
				title: "Nome",
				dataIndex: "nameDisplay",
				key: "nome",
				sorter: (a, b) => a?.name.localeCompare(b?.name ?? "") ?? 0,
				sortDirections: ["descend", "ascend"],
				showSorterTooltip: {
					title: "Clique para ordenar",
				},
				defaultSortOrder: "ascend",
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				responsive: ["sm"],
			},
			{
				title: "Perfil",
				dataIndex: "profileTag",
				key: "profile",
				responsive: ["sm"],
				onFilter: (value, record) => record?.profileId === value,
				filters: profiles?.profiles.map((profile) => ({
					text: profile.description,
					value: profile.id,
				})),
			},
			{
				title: "Status",
				dataIndex: "active",
				key: "active",
				responsive: ["md"],
				width: 150,
				onFilter: (value, record) => record?.user?.active === value,
				filters: [
					{
						text: "Ativo",
						value: true,
					},
					{
						text: "Inativo",
						value: false,
					},
				],
			},
			{
				title: "",
				key: "action",
				dataIndex: "action",
				width: 100,
				render: (_, record) => {
					const isCurrentUser = record?.user.id === user?.id
					return (
						<S.ActionsWrapper key={record?.id}>
							{isCurrentUser ? (
								<Pencil
									color={"#1677ff"}
									onClick={() => onEdit(record?.id ?? "")}
								/>
							) : (
								<Eye
									color={"#1677ff"}
									onClick={() => handleShowDetails(record?.id ?? "")}
								/>
							)}
							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja deletar o usuário ${record?.name ?? ""}?`}
								onConfirm={() => handleDelete(record?.id ?? "")}
								okText={"Deletar"}
								cancelText={"Cancelar"}
								placement={"left"}
							>
								<Trash className={"delete"} />
							</Popconfirm>
						</S.ActionsWrapper>
					)
				},
			},
		]
	}
	const columns = getColumns()

	return (
		<S.TableWrapper>
			<Table
				columns={columns}
				dataSource={dataToShow}
				loading={isLoading}
				pagination={false}
				virtual={true}
			/>
			<Drawer
				title="Editar Usuário"
				open={!!isModalOpen}
				onClose={handleCancel}
				width={600}
			>
				<UserForm
					usuario={userToEdit}
					usuarioId={userToEdit?.id ?? ""}
					className="modal"
					onCancel={handleCancel}
				/>
			</Drawer>
			<UserDetails />
		</S.TableWrapper>
	)
}
