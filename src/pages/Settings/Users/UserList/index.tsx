import { type Profile, useGetProfiles } from "@/services/profileServices"
import { useGetAllUsers, useGetUsersActions } from "@/services/userServices"
import type { User } from "@/types/usuario"
import {
	Modal,
	Popconfirm,
	Table,
	type TableColumnsType,
	Tag,
	Tooltip,
} from "antd"

import { UserForm } from "@/components/NewUser/UserForm"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { Pencil, Trash } from "phosphor-react"
import type React from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

type DataType =
	| {
			id: string
			name: string
			email: string
			active: React.ReactNode
			profile: string
	  }
	| undefined

const TagInfo = ({ active }: { active: boolean }) => {
	const message = active ? "Ativo" : "Inativo"
	return <Tag color={active ? "green" : "red"}>{message}</Tag>
}

const getDataToShow = (
	data: User[] | undefined,
	profiles: Profile[] | undefined,
	query: string,
): DataType[] => {
	if (!data || !profiles) return []
	const values = data.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		active: <TagInfo active={user.active} />,
		profile:
			profiles.find((p) => p.id === user.profileId)?.description ??
			"Desconhecido",
	}))
	if (!query?.length) return values
	return values.filter((user) =>
		user.name.toLowerCase().includes(query.toLowerCase()),
	)
}

export const UserList = () => {
	const { data: users, isLoading: isLoadingUsers, query } = useGetAllUsers()
	const { data: profiles, isLoading: isLoadingProfiles } = useGetProfiles()
	const [searchParams, setSearchParams] = useSearchParams()
	const querySearch = searchParams.get("user") ?? ""
	const { deleteUser } = useGetUsersActions()
	const { showNotification } = useGetNotification()

	const isLoading = isLoadingUsers || isLoadingProfiles

	const dataToShow = getDataToShow(
		users?.users,
		profiles?.profiles,
		querySearch,
	)

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

	const getColumns = (): TableColumnsType<DataType> => {
		return [
			{
				title: "Nome",
				dataIndex: "name",
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
				title: "Status",
				dataIndex: "active",
				key: "active",
				responsive: ["md"],
				width: 150,
				onFilter: (value, record) => record?.active === value,
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
				render: (_, record) => (
					<S.ActionsWrapper key={record?.id}>
						<Tooltip title={`Editar ${record?.name ?? ""}`}>
							<Pencil
								color={"#1677ff"}
								onClick={() => onEdit(record?.id ?? "")}
							/>
						</Tooltip>
						<Tooltip title={`Deletar ${record?.name ?? ""}`}>
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
						</Tooltip>
					</S.ActionsWrapper>
				),
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
			<Modal
				title="Editar Usuário"
				open={!!isModalOpen}
				onCancel={handleCancel}
				footer={false}
			>
				<UserForm
					usuario={userToEdit}
					usuarioId={userToEdit?.id ?? ""}
					className="modal"
					onCancel={handleCancel}
				/>
			</Modal>
		</S.TableWrapper>
	)
}
