import {
	type GenericEntity,
	useGetProductsTypes,
} from "@/services/productsService"
import { TableActionsWrapper, TableWrapper } from "@/style/global"
import { Popconfirm, Table, type TableColumnsType } from "antd"
import { Pencil, Trash } from "phosphor-react"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export const ProductsTypeList = () => {
	const { data, isLoading, query: productsTypesQuery } = useGetProductsTypes()
	const [searchParams] = useSearchParams()
	const typeSearchQuery = searchParams.get("productType")

	const handleDelete = (id: string) => {
		console.log(id)
	}

	const handleEdit = (id: string) => {
		console.log(id)
	}

	const columns: TableColumnsType<GenericEntity> = [
		{
			title: "Descrição",
			dataIndex: "description",
			key: "description",
			render: (_, record) => record?.description,
		},
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: (_, record) => record?.id,
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
							// okButtonProps={{ loading: isDeleting }}
						>
							<Trash className={"delete"} />
						</Popconfirm>
					</TableActionsWrapper>
				)
			},
		},
	]

	const dataToDisplay: GenericEntity[] = useMemo(() => {
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
