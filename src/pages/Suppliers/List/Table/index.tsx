import { StatusTag } from "@/components/StatusTag"
import { cnpjMask } from "@/helpers/general"
import { type Suppliers, useGetSuppliers } from "@/services/useGetSuppliers"
import { Table, type TableColumnsType } from "antd"
import React, { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

type TableDataType = {
	name: string
	legalName: string
	cnpj: string
	active: boolean
	id: string
	fone: string
}

export const SuppliersTable = () => {
	const { data, isLoading, error } = useGetSuppliers()
	const [searchParams, setSearchParams] = useSearchParams()
	const supplierQuery = searchParams.get("supplier")
	console.log(data, isLoading, error)

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
						<S.NameWrapper>
							<p>{record.name}</p>
							<i>{record.legalName}</i>
						</S.NameWrapper>
					)
				},
			},
			{
				title: "CNPJ",
				dataIndex: "cnpj",
				key: "cnpj",
				render: (_, record) => cnpjMask(record.cnpj),
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
		<S.TableWrapper>
			<Table
				columns={getColumns()}
				dataSource={dataToDisplay}
				loading={isLoading}
				pagination={false}
				virtual={true}
			/>
		</S.TableWrapper>
	)
}
