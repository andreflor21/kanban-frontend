import Button from "@/components/Button"
import { ContainerInput, LabelStyled } from "@/components/Input/styles"
import { InputSelect } from "@/components/InputSelect"
import { NewInput } from "@/components/NewInput"
import { cnpjMask, onlyNumbersCnpj } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	type NewSupplierSchema,
	newSupplierSchema,
} from "@/pages/Suppliers/List/NewSupplier/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSupplierInfoByCNPJ,
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { useGetAllUsers } from "@/services/userServices"
import { FormFooter, FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input } from "antd"
import { useEffect, useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

const EMPTY_INITIAL_VALUES: NewSupplierSchema = {
	name: "",
	cnpj: "",
	email: "",
	fone: "",
	legalName: "",
	ERPcode: "",
	code: "",
	users: [],
}

const getOnlyNumbers = (value: string | undefined) => {
	if (!value?.length) return ""
	return value.replace(/[^\d]+/g, "")
}

export const NewSupplier = () => {
	const [cnpj, setCnpj] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { createSupplier, updateSupplier } = useGetSuppliersActions()
	const { data: users } = useGetAllUsers()
	const { query: supplierQuery, data: supplierData } = useGetSuppliers()
	const { showNotification } = useGetNotification()
	const { data: supplierInfo, isLoading: loadingCNPJ } =
		useGetSupplierInfoByCNPJ(cnpj)

	const usersToDisplay = users?.users?.map((user) => ({
		label: user.name,
		value: user.id,
	}))

	const editSupplierId = searchParams.get("edit_supplier_id")
	const isEditing = !!editSupplierId
	const supplier = supplierData?.suppliers?.find(
		(supplier) => supplier.id === editSupplierId,
	)

	const initialValues = useMemo(() => {
		if (!isEditing || !supplier) {
			return EMPTY_INITIAL_VALUES
		}
		if (supplier.cnpj) {
			const onlyNumbers = supplier.cnpj.replace(/[^\d]+/g, "")
			setCnpj(onlyNumbers)
		}
		return {
			name: supplier.name,
			cnpj: supplier.cnpj,
			email: supplier.email,
			fone: supplier.fone,
			legalName: supplier.legalName,
			ERPcode: supplier.ERPcode,
			code: supplier.code,
			users: supplier?.users?.map((user) => user.id),
		}
	}, [supplier, isEditing])

	const methods = useForm<NewSupplierSchema>({
		mode: "all",
		resolver: yupResolver(newSupplierSchema),
		values: initialValues,
	})

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("edit_supplier_id")
			return params
		})
		methods.reset(initialValues)
	}

	useEffect(() => {
		if (!!cnpj?.length && !loadingCNPJ && supplierInfo?.cnpj === cnpj) {
			const name = isEditing
				? supplier?.name
				: (supplierInfo.nome_fantasia ?? "")
			methods.setValue("legalName", supplierInfo?.razao_social)
			methods.setValue("name", name ?? "")
			const fone =
				supplierInfo?.ddd_telefone_1 ?? supplierInfo?.ddd_telefone_2 ?? ""
			methods.setValue("fone", fone)
			methods.trigger(["legalName", "name", "fone"])
		}
	}, [cnpj, loadingCNPJ, supplierInfo, methods, isEditing, supplier])

	const handleEdit = async () => {
		const id = searchParams.get("edit_supplier_id")
		if (!id) return

		setIsLoading(true)
		const values = methods.getValues()
		if (values?.cnpj?.length) {
			values.cnpj = onlyNumbersCnpj(values.cnpj)
		}

		const keys = Object.keys(values) as (keyof NewSupplierSchema)[]

		for (const key of keys) {
			if (!values[key]?.length) {
				delete values[key]
			}
		}

		try {
			await updateSupplier(id, values)
			await supplierQuery.refetch()
			showNotification({
				message: "Fornecedor atualizado com sucesso",
				description: "O fornecedor foi atualizado com sucesso",
				type: "SUCCESS",
			})
			handleCancel()
		} catch (error) {
			const parsedError = parseError(error as ErrorExtended)
			showNotification({
				message: "Erro ao atualizar fornecedor",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = async (data: NewSupplierSchema) => {
		setIsLoading(true)
		const updatedData = { ...data }
		if (updatedData?.cnpj?.length) {
			updatedData.cnpj = onlyNumbersCnpj(updatedData.cnpj)
		}

		const keys = Object.keys(updatedData) as (keyof NewSupplierSchema)[]

		for (const key of keys) {
			if (!updatedData[key]?.length) {
				delete updatedData[key]
			}
		}

		try {
			await createSupplier(updatedData)
			showNotification({
				message: "Fornecedor criado com sucesso",
				description: "O fornecedor foi criado com sucesso",
				type: "SUCCESS",
			})
			await supplierQuery.refetch()
			handleCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				message: "Erro ao criar fornecedor",
				description: parsedError ?? "Por favor, tente novamente mais tarde",
				type: "ERROR",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleCNPJorCPF = (value: string) => {
		const isCNPJ = value.length === 14
		if (isCNPJ) {
			setCnpj(value)
			const masked = cnpjMask(value)
			methods.setValue("cnpj", masked)
			methods.trigger("cnpj")
			return
		}
		setCnpj("")
		methods.setValue("cnpj", value)
		methods.trigger("cnpj")
	}

	return (
		<div>
			<FormStyled
				onSubmit={methods.handleSubmit(isEditing ? handleEdit : handleSubmit)}
			>
				<Controller
					name={"cnpj"}
					control={methods.control}
					render={({ field }) => {
						const onlyNumbers = getOnlyNumbers(field?.value)
						const isCNPJ = !!onlyNumbers?.length && onlyNumbers.length > 11

						if (onlyNumbers?.length === 14) {
							setCnpj(onlyNumbers)
						}
						if (isCNPJ) {
							return (
								<ContainerInput>
									<LabelStyled htmlFor={"cnpj"}>CNPJ/CPF</LabelStyled>
									<Input.Search
										autoFocus
										size={"large"}
										placeholder="CNPJ do fornecedor"
										{...field}
										loading={loadingCNPJ}
										value={cnpjMask(onlyNumbers)}
										onChange={(e) => {
											const onlyNumbers = getOnlyNumbers(e.target.value)
											handleCNPJorCPF(onlyNumbers)
										}}
									/>
								</ContainerInput>
							)
						}

						return (
							<NewInput
								autoFocus
								label={"CNPJ/CPF"}
								placeholder={"CNPJ/CPF do fornecedor"}
								{...field}
							/>
						)
					}}
				/>
				<Controller
					name={"name"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label="Nome"
							placeholder="Nome do fornecedor"
							errorMessage={methods.formState.errors.name?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name={"legalName"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label="Razão Social"
							placeholder="Razão Social do fornecedor"
							errorMessage={methods.formState.errors.legalName?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name={"ERPcode"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label="Código de ERP"
							placeholder="ERP do fornecedor"
							errorMessage={methods.formState.errors.ERPcode?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name={"code"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label="Código"
							placeholder="Código do fornecedor"
							errorMessage={methods.formState.errors.code?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name={"fone"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label="Telefone"
							placeholder="Telefone do fornecedor"
							errorMessage={methods.formState.errors.fone?.message}
							{...field}
						/>
					)}
				/>

				<InputSelect
					mode="multiple"
					label="Usuário responsável"
					placeholder="Selecione o usuário responsável"
					value={methods.watch("users")}
					options={usersToDisplay ?? []}
					onChange={(value) => {
						methods.setValue("users", value)
						methods.trigger("users")
					}}
				/>
				<FormFooter>
					<Button className="button1" onClickFunc={handleCancel} danger>
						Cancelar
					</Button>
					<Button
						className="button2"
						htmlType="submit"
						disabled={
							!methods.formState.isValid ||
							!methods.formState.isDirty ||
							isLoading
						}
						type="primary"
						isLoading={isLoading}
					>
						{isEditing ? "Atualizar" : "Criar"}
					</Button>
				</FormFooter>
			</FormStyled>
		</div>
	)
}
