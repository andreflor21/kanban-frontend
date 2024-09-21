import { DetailsProfile } from "@/pages/Settings/Profile/DetailsProfile"
import { type ProfileType, useGetProfiles } from "@/services/profileServices"
import { TableActionsWrapper, TableWrapper } from "@/style/global"
import {
	Popconfirm,
	Popover,
	Table,
	type TableColumnsType,
	Tag,
	Tooltip,
} from "antd"
import { Copy, Eye, Trash } from "phosphor-react"
import React, { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const MAX_USERS_TO_SHOW = 5

export const ProfilesTable = () => {
	const { data, isLoading } = useGetProfiles()
	const [searchParams, setSearchParams] = useSearchParams()

	const handleDelete = useCallback(async (id: string) => {
		console.log(id)
	}, [])

	const handleDuplicate = useCallback(async (id: string) => {
		console.log(id)
	}, [])

	const handleToggleDetails = useCallback(
		async (id: string | undefined) => {
			setSearchParams((params) => {
				id ? params.set("profile_id", id) : params.delete("profile_id")
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
				width: 120,
				render: (_, record) => {
					return (
						<TableActionsWrapper key={record?.id}>
							<Tooltip key={record.id} title={"Visualizar Perfil"}>
								<Eye
									color={"#1677ff"}
									onClick={() => handleToggleDetails(record?.id ?? "")}
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
	}, [data, handleDelete, handleDuplicate, handleToggleDetails])

	return (
		<>
			<TableWrapper>
				<Table
					columns={columns}
					dataSource={data?.profiles}
					loading={isLoading}
					pagination={false}
					virtual={true}
				/>
			</TableWrapper>
			<DetailsProfile />
		</>
	)
}
