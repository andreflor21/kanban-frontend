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
import { Popconfirm, Table, type TableColumnsType } from "antd"
import { Pencil, Trash } from "phosphor-react"
import React, { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"

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

	const mesureUnitId = searchParams.get("mesure_unit_id")
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

	const dataToDisplay: MeasureUnit[] = useMemo(() => {
		if (!data?.units) return []
		if (!mesureUnitSearchQuery) return data.units
		return data.units.filter((unit) =>
			unit.abrev.toLowerCase().includes(mesureUnitSearchQuery.toLowerCase()),
		)
	}, [data, mesureUnitSearchQuery])

	return (
		<TableWrapper>
			<Table
				columns={columns}
				dataSource={dataToDisplay}
				virtual={true}
				loading={isLoading}
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
					disabled: mesureUnitsQuery.isPlaceholderData,
				}}
			/>
		</TableWrapper>
	)
}