import Button from "@/components/Button"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import { cnpjMask, onlyNumbersCnpj } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	type NewSupplierSchema,
	newSupplierSchema,
} from "@/pages/Suppliers/List/NewSupplier/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { useGetAllUsers } from "@/services/userServices"
import { FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

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

export const NewSupplier = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { createSupplier, updateSupplier } = useGetSuppliersActions()
	const { data: users } = useGetAllUsers()
	const { query: supplierQuery, data: supplierData } = useGetSuppliers()
	const { showNotification } = useGetNotification()

	const usersToDisplay = users?.users?.map((user) => ({
		label: user.name,
		value: user.id,
	}))

	const editSupplierId = searchParams.get("edit_supplier_id")
	const isEditing = !!editSupplierId

	const initialValues = useMemo(() => {
		const supplier = supplierData?.suppliers?.find(
			(supplier) => supplier.id === editSupplierId,
		)
		if (!isEditing || !supplier) {
			return EMPTY_INITIAL_VALUES
		}
		return {
			name: supplier.name,
			cnpj: supplier.cnpj,
			email: supplier.email,
			fone: supplier.fone,
			legalName: supplier.legalName,
			ERPcode: supplier.ERPCode,
			code: supplier.code,
			users: supplier?.users?.map((user) => user.id),
		}
	}, [editSupplierId, isEditing, supplierData])

	const methods = useForm<NewSupplierSchema>({
		mode: "onChange",
		resolver: yupResolver(newSupplierSchema),
		values: initialValues,
	})

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("edit_supplier_id")
			return params
		})
		methods.reset()
	}

	const handleEdit = async () => {
		const id = searchParams.get("edit_supplier_id")
		if (!id) return

		setIsLoading(true)
		const values = methods.getValues()

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
		const updatedData = {
			...data,
			cnpj: onlyNumbersCnpj(data.cnpj),
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

	return (
		<div>
			<FormStyled
				onSubmit={methods.handleSubmit(isEditing ? handleEdit : handleSubmit)}
			>
				<Input
					required
					label="Nome"
					placeholder="Nome do fornecedor"
					errorMessage={methods.formState.errors.name?.message}
					{...methods.register("name")}
				/>
				<Input
					required
					label="CNPJ"
					placeholder="CNPJ do fornecedor"
					errorMessage={methods.formState.errors.cnpj?.message}
					onChange={(e) => {
						const masked = cnpjMask(e.target.value)
						if (e.target.value.length > 18) {
							return
						}
						methods.setValue("cnpj", masked)
						methods.trigger("cnpj")
					}}
					value={methods.watch("cnpj")}
				/>
				<Input
					required
					label="Email"
					placeholder="Email do fornecedor"
					errorMessage={methods.formState.errors.email?.message}
					{...methods.register("email")}
				/>

				<Input
					required
					label="Razão Social"
					placeholder="Razão Social do fornecedor"
					errorMessage={methods.formState.errors.legalName?.message}
					{...methods.register("legalName")}
				/>
				<Input
					required
					label="Código de ERP"
					placeholder="ERP do fornecedor"
					errorMessage={methods.formState.errors.ERPcode?.message}
					{...methods.register("ERPcode")}
				/>
				<Input
					required
					label="Código"
					placeholder="Código do fornecedor"
					errorMessage={methods.formState.errors.code?.message}
					{...methods.register("code")}
				/>
				<Input
					label="Telefone"
					placeholder="Telefone do fornecedor"
					errorMessage={methods.formState.errors.fone?.message}
					{...methods.register("fone")}
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
				<S.ContainerButtons>
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
				</S.ContainerButtons>
			</FormStyled>
		</div>
	)
}
