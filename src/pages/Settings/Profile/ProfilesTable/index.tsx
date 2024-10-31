import { useGetNotification } from "@/hooks/useGetNotification"
import { useHandlePagination } from "@/hooks/useHandlePagination"
import { DetailsProfile } from "@/pages/Settings/Profile/DetailsProfile"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type ProfileType,
	useGetProfiles,
	useGetProfilesActions,
} from "@/services/profileServices"
import { TableActionsWrapper, TableWrapper } from "@/style/global"
import {
	Popconfirm,
	Popover,
	Table,
	type TableColumnsType,
	Tag,
	Tooltip,
} from "antd"
import { Copy, Eye, Pencil, Trash } from "phosphor-react"
import React, { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const MAX_USERS_TO_SHOW = 5

export const ProfilesTable = () => {
	const { data, isLoading, query: profilesQuery } = useGetProfiles()
	const [searchParams, setSearchParams] = useSearchParams()
	const profileQuery = searchParams.get("profile")
	const { deleteProfile } = useGetProfilesActions()
	const { showNotification } = useGetNotification()
	const { pageSize, handlePagination, handleChangePageSize } =
		useHandlePagination()

	const dataToShow = useMemo(() => {
		if (!data) return []
		if (profileQuery) {
			return data.profiles.filter((profile) =>
				profile.description.toLowerCase().includes(profileQuery.toLowerCase()),
			)
		}
		return data.profiles
	}, [data, profileQuery])

	const handleDelete = useCallback(
		async (id: string) => {
			try {
				await deleteProfile(id)
				showNotification({
					type: "SUCCESS",
					message: "Perfil deletado com sucesso",
					description: "",
				})
				await profilesQuery.refetch()
			} catch (err) {
				const parsedError = parseError(err as ErrorExtended)
				showNotification({
					type: "ERROR",
					message: "Erro ao deletar perfil",
					description: parsedError ?? "Por favor, tente novamente",
				})
			}
		},
		[deleteProfile, showNotification, profilesQuery],
	)

	const handleDuplicate = useCallback(
		async (id: string) => {
			setSearchParams((params) => {
				params.set("action", "duplicate_profile")
				params.set("edit_profile_id", id)
				return params
			})
		},
		[setSearchParams],
	)

	const handleToggleDetails = useCallback(
		async (id: string | undefined) => {
			setSearchParams((params) => {
				id ? params.set("profile_id", id) : params.delete("profile_id")
				return params
			})
		},
		[setSearchParams],
	)

	const handleEdit = useCallback(
		async (id: string | undefined) => {
			setSearchParams((params) => {
				id
					? params.set("edit_profile_id", id)
					: params.delete("edit_profile_id")
				return params
			})
		},
		[setSearchParams],
	)

	const columns: TableColumnsType<ProfileType> = useMemo(() => {
		if (!data) return []
		return [
			{
				title: "Nome",
				dataIndex: "description",
				key: "description",
				render: (_, record) => record?.description,
				sortDirections: ["descend", "ascend"],
				showSorterTooltip: {
					title: "Clique para ordenar",
				},
				defaultSortOrder: "ascend",
				sorter: (a, b) =>
					a?.description.localeCompare(b?.description ?? "") ?? 0,
			},
			{
				title: "Usuários",
				dataIndex: "users",
				key: "users",
				render: (_, record) =>
					record?.users.length > MAX_USERS_TO_SHOW ? (
						<>
							{record?.users.slice(0, MAX_USERS_TO_SHOW).map((user) => (
								<Tag key={user.id}>{user.name}</Tag>
							))}
							<Popover
								content={
									<div>
										{record?.users.slice(MAX_USERS_TO_SHOW).map((user) => (
											<Tag key={user.id}>{user.name}</Tag>
										))}
									</div>
								}
								trigger="hover"
							>
								<Tag
									style={{
										marginLeft: "5px",
										backgroundColor: "transparent",
										color: "var(--text-color)",
									}}
								>
									+ {record?.users.length - 3}
								</Tag>
							</Popover>
						</>
					) : (
						record?.users.map((user) => <Tag key={user.id}>{user.name}</Tag>)
					),
			},
			{
				title: "",
				dataIndex: "action",
				key: "action",
				width: 150,
				render: (_, record) => {
					return (
						<TableActionsWrapper key={record?.id}>
							<Tooltip key={record.id} title={"Visualizar Perfil"}>
								<Eye
									color={"#1677ff"}
									onClick={() => handleToggleDetails(record?.id ?? "")}
								/>
							</Tooltip>
							<Tooltip key={record.id} title={"Editar Perfil"}>
								<Pencil
									color={"#1677ff"}
									onClick={() => handleEdit(record?.id ?? "")}
								/>
							</Tooltip>
							<Tooltip key={record.id} title={"Duplicar Perfil"}>
								<Copy onClick={() => handleDuplicate(record?.id ?? "")} />
							</Tooltip>

							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja deletar o perfil ${record?.description ?? ""}?`}
								onConfirm={() => handleDelete(record?.id ?? "")}
								okText={"Deletar"}
								cancelText={"Cancelar"}
								placement={"left"}
							>
								<Tooltip title={"Deletar Perfil"}>
									<Trash className={"delete"} />
								</Tooltip>
							</Popconfirm>
						</TableActionsWrapper>
					)
				},
			},
		]
	}, [data, handleDelete, handleDuplicate, handleToggleDetails, handleEdit])

	const getTotalItems = () => {
		if (!data?.totalPages || !pageSize) return 0
		return data.totalPages * Number(pageSize)
	}

	return (
		<>
			<TableWrapper>
				<Table
					columns={columns}
					dataSource={dataToShow}
					loading={isLoading}
					virtual={true}
					pagination={{
						showSizeChanger: !!data?.totalPages && data?.totalPages > 5,
						current: data?.currentPage,
						total: getTotalItems(),
						pageSize: Number(pageSize),
						onChange: (page, size) => {
							handlePagination(page, Number(pageSize))
							if (size !== Number(pageSize)) {
								handleChangePageSize(size)
							}
						},
						disabled: profilesQuery.isPlaceholderData,
					}}
				/>
			</TableWrapper>
			<DetailsProfile />
		</>
	)
}
