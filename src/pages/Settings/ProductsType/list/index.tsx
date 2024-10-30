import { useGetNotification } from "@/hooks/useGetNotification"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type ProductsType,
	useGetProductsTypes,
	useGetProductsTypesActions,
} from "@/services/productsService"
import { TableActionsWrapper, TableWrapper } from "@/style/global"
import { Popconfirm, Table, type TableColumnsType, Tag, Tooltip } from "antd"
import { Pencil, Trash } from "phosphor-react"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const ProductsTypeList = () => {
	const { data, isLoading, query: productsTypesQuery } = useGetProductsTypes()
	const [searchParams, setSearchParams] = useSearchParams()
	const [isDeleting, setIsDeleting] = useState(false)
	const { deleteProductType } = useGetProductsTypesActions()
	const typeSearchQuery = searchParams.get("productType")
	const { showNotification } = useGetNotification()

	const handleDelete = async (id: string) => {
		setIsDeleting(true)
		try {
			await deleteProductType(id)
			await productsTypesQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Tipo de produto deletado com sucesso",
				description: "",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao deletar tipo de produto",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsDeleting(false)
		}
	}

	const handleEdit = (id: string) => {
		setSearchParams((params) => {
			params.set("product_type_id", id)
			return params
		})
	}

	const columns: TableColumnsType<ProductsType> = [
		{
			title: "Descrição",
			dataIndex: "description",
			key: "description",
			render: (_, record) => record?.description,
			sorter: (a, b) => a?.description.localeCompare(b?.description ?? "") ?? 0,
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: (_, record) => record?.id,
		},
		{
			title: "Produtos associados",
			dataIndex: "products",
			key: "products",
			render: (_, record) => (
				<Tag color={record?.products > 0 ? "green" : "red"}>
					{record?.products}
				</Tag>
			),
			sorter: (a, b) => a?.products - b?.products,
			sortDirections: ["descend", "ascend"],
		},
		{
			title: "",
			dataIndex: "action",
			key: "action",
			width: 100,
			render: (_, record) => {
				const isReadOnly = record.products > 0
				return (
					<TableActionsWrapper key={record?.id}>
						<Pencil
							color={"#1677ff"}
							onClick={() => handleEdit(record?.id ?? "")}
						/>
						{isReadOnly ? (
							<Tooltip
								title={
									"Não é possível excluir um tipo de produto com produtos associados"
								}
							>
								<Trash
									color={"#ccc"}
									size={18}
									style={{ cursor: "not-allowed" }}
								/>
							</Tooltip>
						) : (
							<Popconfirm
								key={record?.id}
								title={`Tem certeza que deseja excluir o produto ${record?.description ?? ""}?`}
								onConfirm={() => handleDelete(record?.id ?? "")}
								okText={"Deletar"}
								cancelText={"Cancelar"}
								placement={"topLeft"}
								okButtonProps={{ loading: isDeleting }}
							>
								<Trash className={"delete"} />
							</Popconfirm>
						)}
					</TableActionsWrapper>
				)
			},
		},
	]

	const dataToDisplay: ProductsType[] = useMemo(() => {
		if (!data?.productTypes) return []
		if (!typeSearchQuery) return data.productTypes
		return data.productTypes.filter((product) =>
			product.description.toLowerCase().includes(typeSearchQuery.toLowerCase()),
		)
	}, [data, typeSearchQuery])

	return (
		<TableWrapper>
			<Table
				columns={columns}
				dataSource={dataToDisplay}
				virtual={true}
				loading={isLoading}
				pagination={false}
			/>
		</TableWrapper>
	)
}
