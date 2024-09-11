import { type Profile, useGetProfiles } from "@/services/profileServices"
import { useGetAllUsers, useGetUsersActions } from "@/services/userServices"
import type { User } from "@/types/usuario"
import { Popconfirm, Table, type TableColumnsType, Tag, Tooltip } from "antd"

import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import { Pencil, Trash } from "phosphor-react"
import type React from "react"
import { Link } from "react-router-dom"
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
): DataType[] => {
	if (!data || !profiles) return []
	return data.map((user) => ({
		id: user.id,
		name: user.name,
		email: user.email,
		active: <TagInfo active={user.active} />,
		profile:
			profiles.find((p) => p.id === user.profileId)?.description ??
			"Desconhecido",
	}))
}

type DeleteConfig = {
	isDeleting: boolean
}

export const UserList = () => {
	const { data: users, isLoading: isLoadingUsers, query } = useGetAllUsers()
	const { data: profiles, isLoading: isLoadingProfiles } = useGetProfiles()
	const { deleteUser } = useGetUsersActions()
	const { showNotification } = useGetNotification()

	const isLoading = isLoadingUsers || isLoadingProfiles

	const dataToShow = getDataToShow(users?.users, profiles?.profiles)

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
							<Link to={`/users/${record?.id ?? ""} `}>
								<Pencil />
							</Link>
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
							{/*<Trash*/}
							{/*	className={"delete"}*/}
							{/*	onClick={() => handleDelete(record?.id ?? "")}*/}
							{/*/>*/}
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
		</S.TableWrapper>
	)
}
