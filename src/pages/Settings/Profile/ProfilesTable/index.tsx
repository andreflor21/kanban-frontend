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
import { Copy, Trash } from "phosphor-react"
import { useCallback, useMemo } from "react"
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
				width: 100,
				render: (_, record) => {
					return (
						<TableActionsWrapper key={record?.id}>
							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja duplicar o perfil ${record?.description ?? ""}?`}
								onConfirm={() => handleDuplicate(record?.id ?? "")}
								okText={"Duplicar"}
								cancelText={"Cancelar"}
								placement={"left"}
							>
								<Tooltip title={"Duplicar"}>
									<Copy />
								</Tooltip>
							</Popconfirm>
							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja deletar o perfil ${record?.description ?? ""}?`}
								onConfirm={() => handleDelete(record?.id ?? "")}
								okText={"Deletar"}
								cancelText={"Cancelar"}
								placement={"left"}
							>
								<Tooltip title={"Deletar"}>
									<Trash className={"delete"} />
								</Tooltip>
							</Popconfirm>
						</TableActionsWrapper>
					)
				},
			},
		]
	}, [data, handleDelete, handleDuplicate])

	return (
		<TableWrapper>
			<Table
				columns={columns}
				dataSource={data?.profiles}
				loading={isLoading}
				pagination={false}
				virtual={true}
			/>
		</TableWrapper>
	)
}
