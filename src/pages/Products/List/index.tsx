import { getTextValue } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { useHandlePagination } from "@/hooks/useHandlePagination"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type ProductType,
	useGetProducts,
	useGetProductsActions,
} from "@/services/productsService"
import {
	InfoAndSubInfoWrapper,
	TableActionsWrapper,
	TableWrapper,
} from "@/style/global"
import { Popconfirm, Table, type TableColumnsType, Tag } from "antd"
import { Pencil, Trash } from "phosphor-react"
import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

export const ProductsList = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isDeleting, setIsDeleting] = useState(false)
	const { deleteProduct } = useGetProductsActions()
	const productQuery = searchParams.get("product")
	const { data, isLoading, query: productsQuery } = useGetProducts()
	const { showNotification } = useGetNotification()
	const { pageSize, handlePagination, handleChangePageSize } =
		useHandlePagination()

	const handleDelete = async (id: string) => {
		setIsDeleting(true)
		try {
			await deleteProduct(id)
			await productsQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Produto excluído com sucesso",
				description: "",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao excluir produto",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsDeleting(false)
		}
	}

	const handleEdit = (id: string) => {
		setSearchParams((params) => {
			params.set("edit_product_id", id)
			return params
		})
	}

	const columns: TableColumnsType<ProductType> = [
		{
			title: "Código",
			dataIndex: "code",
			key: "code",
			width: 120,
			sorter: (a, b) => a?.code.localeCompare(b?.code ?? "") ?? 0,
			sortDirections: ["descend", "ascend"],
			showSorterTooltip: {
				title: "Clique para ordenar",
			},
			defaultSortOrder: "ascend",
		},
		{
			title: "Descrição",
			dataIndex: "description",
			key: "description",
			sorter: (a, b) => a?.description.localeCompare(b?.description ?? "") ?? 0,
			sortDirections: ["descend", "ascend"],
			showSorterTooltip: {
				title: "Clique para ordenar",
			},
			defaultSortOrder: "ascend",
			render: (_, record) => (
				<InfoAndSubInfoWrapper key={record.id}>
					<p>{record.description}</p>
					<i>{record?.additionalDescription}</i>
				</InfoAndSubInfoWrapper>
			),
		},
		{
			title: "Tipo de produto",
			dataIndex: "productType",
			key: "productType",
			render: (_, record) => getTextValue(record?.productType?.description),
		},
		{
			title: "Unidade de medida",
			dataIndex: "stockUnit",
			key: "stockUnit",
			render: (_, record) => (
				<Tag>{getTextValue(record?.stockUnit?.abrev)}</Tag>
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
						<Pencil
							color={"#1677ff"}
							onClick={() => handleEdit(record?.id ?? "")}
						/>
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
					</TableActionsWrapper>
				)
			},
		},
	]

	const dataToDisplay: ProductType[] = useMemo(() => {
		if (!data?.products) return []
		if (!productQuery) return data.products
		return data.products.filter((product) =>
			product.description.toLowerCase().includes(productQuery.toLowerCase()),
		)
	}, [data, productQuery])

	const getTotalItems = () => {
		if (!data?.totalPages || !pageSize) return 0
		return data.totalPages * Number(pageSize)
	}

	return (
		<TableWrapper>
			<Table
				columns={columns}
				dataSource={dataToDisplay}
				loading={isLoading}
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
					disabled: productsQuery.isPlaceholderData,
				}}
			/>
		</TableWrapper>
	)
}
