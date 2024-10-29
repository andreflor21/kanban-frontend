import { StatusTag } from "@/components/StatusTag"
import { cnpjMask, onlyNumbersCnpj } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { useHandlePagination } from "@/hooks/useHandlePagination"
import { NewSupplier } from "@/pages/Suppliers/List/NewSupplier"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type Suppliers,
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import {
	InfoAndSubInfoWrapper,
	TableActionsWrapper,
	TableWrapper,
} from "@/style/global"
import {
	Drawer,
	Popconfirm,
	Table,
	type TableColumnsType,
	Typography,
} from "antd"
import { Eye, Pencil, Trash } from "phosphor-react"
import React, { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

const { Paragraph } = Typography
export const SuppliersTable = () => {
	const { data, isLoading, error, query } = useGetSuppliers()
	const { deleteSupplier } = useGetSuppliersActions()
	const [searchParams, setSearchParams] = useSearchParams()
	const { showNotification } = useGetNotification()
	const { pageSize, currentPage, handlePagination, handleChangePageSize } =
		useHandlePagination()

	const supplierQuery = searchParams.get("supplier")
	const editSupplierId = searchParams.get("edit_supplier_id")
	const isDrawerOpen = !!editSupplierId

	const handleDelete = async (id: string): Promise<void> => {
		try {
			await deleteSupplier(id)
			await query.refetch()
			showNotification({
				message: "Fornecedor deletado com sucesso",
				description: "O fornecedor foi deletado com sucesso",
				type: "SUCCESS",
			})
		} catch (error) {
			const parsedError = parseError(error as ErrorExtended)
			showNotification({
				message: "Erro ao deletar fornecedor",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		}
	}

	const getColumns = (): TableColumnsType<Suppliers> => {
		return [
			{
				title: "Nome",
				dataIndex: "name",
				key: "name",
				sorter: (a, b) => a?.name.localeCompare(b?.name ?? "") ?? 0,
				sortDirections: ["descend", "ascend"],
				showSorterTooltip: {
					title: "Clique para ordenar",
				},
				defaultSortOrder: "ascend",
				render: (_, record) => {
					return (
						<InfoAndSubInfoWrapper key={record.id}>
							<p>{record.name}</p>
							<i>{record.legalName}</i>
						</InfoAndSubInfoWrapper>
					)
				},
			},
			{
				title: "CNPJ",
				dataIndex: "cnpj",
				key: "cnpj",
				render: (_, record) => (
					<Paragraph
						key={record.id}
						copyable={{
							text: onlyNumbersCnpj(record.cnpj),
						}}
					>
						{cnpjMask(record.cnpj)}
					</Paragraph>
				),
			},

			{
				title: "Telefone",
				dataIndex: "fone",
				key: "fone",
				responsive: ["md"],
				width: 150,
				render: (_, record) => (record?.fone ? record.fone : "Não informado"),
			},
			{
				title: "Código ERP",
				dataIndex: "code",
				key: "ERPcode",
				responsive: ["md"],
				width: 150,
				render: (_, record) => (record?.code ? record.code : "Não informado"),
			},
			{
				title: "Status",
				dataIndex: "active",
				key: "active",
				responsive: ["md"],
				width: 150,
				render: (_, record) => (
					<StatusTag key={record.id} active={record.active} />
				),
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
				width: 120,
				render: (_, record) => {
					return (
						<TableActionsWrapper key={record?.id}>
							<Eye
								color={"#1677ff"}
								onClick={() =>
									setSearchParams((params) => {
										if (!record?.id) return params
										params.set("supplier_id", record?.id)
										return params
									})
								}
							/>
							<Pencil
								color={"#1677ff"}
								onClick={() =>
									setSearchParams((params) => {
										params.set("edit_supplier_id", record?.id ?? "")
										return params
									})
								}
							/>
							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja deletar o fornecedor ${record?.name ?? ""}?`}
								onConfirm={() => handleDelete(record?.id ?? "")}
								okText={"Deletar"}
								cancelText={"Cancelar"}
								placement={"left"}
							>
								<Trash className={"delete"} />
							</Popconfirm>
						</TableActionsWrapper>
					)
				},
			},
		]
	}

	const dataToDisplay: Suppliers[] = useMemo(() => {
		if (!data?.suppliers) return []
		if (!supplierQuery) return data.suppliers

		return data.suppliers.filter((supplier) => {
			return (
				supplier.name.toLowerCase().includes(supplierQuery.toLowerCase()) ||
				supplier.cnpj.includes(supplierQuery)
			)
		})
	}, [data?.suppliers, supplierQuery])

	return (
		<TableWrapper>
			<Table
				columns={getColumns()}
				dataSource={dataToDisplay}
				loading={isLoading}
				virtual={true}
				pagination={{
					showSizeChanger: !!data?.totalPages && data?.totalPages > 5,
					current: data?.currentPage,
					total: data?.totalPages,
					pageSize: Number(pageSize),
					onChange: (page, size) => {
						handlePagination(page, Number(pageSize))
						if (size !== Number(pageSize)) {
							handleChangePageSize(size)
						}
					},
					disabled: query.isPlaceholderData,
				}}
			/>
			<Drawer
				title="Editar Fornecedor"
				placement="right"
				width={600}
				open={isDrawerOpen}
				onClose={() => {
					setSearchParams((params) => {
						params.delete("edit_supplier_id")
						return params
					})
				}}
			>
				<NewSupplier />
			</Drawer>
		</TableWrapper>
	)
}
