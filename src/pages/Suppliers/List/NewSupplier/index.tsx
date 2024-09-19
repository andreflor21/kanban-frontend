import Button from "@/components/Button"
import Input from "@/components/Input"
import { InputSelect } from "@/components/InputSelect"
import { cnpjMask, onlyNumbersCnpj } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import { type NewSupplierSchema, newSupplierSchema, } from "@/pages/Suppliers/List/NewSupplier/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import { useGetSuppliers, useGetSuppliersActions, } from "@/services/useGetSuppliers"
import { useGetAllUsers } from "@/services/userServices"
import { FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

export const NewSupplier = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [_, setSearchParams] = useSearchParams()
	const { createSupplier } = useGetSuppliersActions()
	const { data: users } = useGetAllUsers()
	const { query: supplierQuery } = useGetSuppliers()
	const { showNotification } = useGetNotification()
	const usersToDisplay = users?.users?.map((user) => ({
		label: user.name,
		value: user.id,
	}))

	const initialValues: NewSupplierSchema = {
		name: "",
		cnpj: "",
		email: "",
		fone: "",
		legalName: "",
		ERPcode: "",
		code: "",
		users: [],
	}

	const methods = useForm<NewSupplierSchema>({
		mode: "onChange",
		resolver: yupResolver(newSupplierSchema),
		values: initialValues,
	})

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			return params
		})
		methods.reset()
	}

	const isEditing = false
	const handleEdit = () => {
		console.log("handle edit")
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
			<FormStyled onSubmit={methods.handleSubmit(handleSubmit)}>
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
					}}
				/>
				<S.ContainerButtons>
					<Button className="button1" onClickFunc={handleCancel} danger>
						Cancelar
					</Button>
					<Button
						className="button2"
						htmlType="submit"
						disabled={!methods.formState.isValid}
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
