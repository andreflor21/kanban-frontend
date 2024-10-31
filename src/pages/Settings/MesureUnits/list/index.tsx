import { useGetNotification } from "@/hooks/useGetNotification"
import { useHandlePagination } from "@/hooks/useHandlePagination"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	type MeasureUnit,
	useGetProductsMesureUnits,
	useGetProductsMesureUnitsActions,
} from "@/services/productsService"
import {
	InfoAndSubInfoWrapper,
	TableActionsWrapper,
	TableWrapper,
} from "@/style/global"
import { Popconfirm, Table, type TableColumnsType, Tag, Tooltip } from "antd"
import { Pencil, Trash } from "phosphor-react"
import React, { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

const IN_USE_TITLE =
	"Esta unidade de medida está associada a um ou mais produtos"
const NOT_IN_USE_TITLE =
	"Esta unidade de medida não está associada a nenhum produto"

export const MesureUnitsList = () => {
	const {
		data,
		isLoading,
		query: mesureUnitsQuery,
	} = useGetProductsMesureUnits()
	const [searchParams, setSearchParams] = useSearchParams()
	const [isDeleting, setIsDeleting] = useState(false)
	const { showNotification } = useGetNotification()
	const { deleteProductMesureUnit } = useGetProductsMesureUnitsActions()
	const { pageSize, handlePagination, handleChangePageSize } =
		useHandlePagination()

	const mesureUnitSearchQuery = searchParams.get("mesureUnit")

	const handleDelete = async (id: string) => {
		setIsDeleting(true)
		try {
			await deleteProductMesureUnit(id)
			await mesureUnitsQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Unidade de medida deletado com sucesso",
				description: "",
			})
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao deletar unidade de medida",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsDeleting(false)
		}
	}

	const handleEdit = (id: string) => {
		setSearchParams((params) => {
			params.set("mesure_unit_id", id)
			return params
		})
	}

	const columns: TableColumnsType<MeasureUnit> = [
		{
			title: "Unidade de medida",
			dataIndex: "abrev",
			key: "abrev",
			sorter: (a, b) => a?.abrev.localeCompare(b?.abrev ?? "") ?? 0,
			sortDirections: ["descend", "ascend"],
			render: (_, record) => {
				return (
					<InfoAndSubInfoWrapper key={record.id}>
						<p>{record.abrev}</p>
						<i>{record.description}</i>
					</InfoAndSubInfoWrapper>
				)
			},
		},
		{
			title: "id",
			dataIndex: "id",
			key: "id",
			render: (_, record) => record?.id,
		},
		{
			title: "Status",
			dataIndex: "products",
			key: "products",
			render: (_, record) => {
				const isInUse = record?.products > 0
				return (
					<Tooltip title={isInUse ? IN_USE_TITLE : NOT_IN_USE_TITLE}>
						<Tag color={isInUse ? "green" : "red"}>
							{isInUse ? "Em uso" : "Inutilizado"}
						</Tag>
					</Tooltip>
				)
			},
			filters: [
				{
					text: "Em uso",
					value: true,
				},
				{
					text: "Inutilizado",
					value: false,
				},
			],
			onFilter: (value, record) => {
				const isInUse = record?.products > 0
				return isInUse === value
			},
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
									"Não é possível excluir uma unidade de medida com produtos associados"
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
								title={`Tem certeza que deseja excluir a unidade de medida ${record?.abrev ?? ""}?`}
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

	const dataToDisplay: MeasureUnit[] = useMemo(() => {
		if (!data?.units) return []
		if (!mesureUnitSearchQuery) return data.units
		return data.units.filter((unit) =>
			unit.abrev.toLowerCase().includes(mesureUnitSearchQuery.toLowerCase()),
		)
	}, [data, mesureUnitSearchQuery])

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
					defaultPageSize: 10,
					defaultCurrent: 1,
					total: getTotalItems(),
					pageSize: Number(pageSize),
					onChange: (page, size) => {
						handlePagination(page, Number(pageSize))
						if (size !== Number(pageSize)) {
							handleChangePageSize(size)
						}
					},
					disabled: mesureUnitsQuery.isPlaceholderData,
				}}
			/>
		</TableWrapper>
	)
}
