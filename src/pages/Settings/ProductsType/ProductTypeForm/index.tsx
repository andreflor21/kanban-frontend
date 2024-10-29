import { NewInput } from "@/components/NewInput"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	EMPTY_PRODUCTS_TYPE,
	type ProductTypeSchemaType,
	productTypeSchema,
} from "@/pages/Settings/ProductsType/ProductTypeForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetProductsTypes,
	useGetProductsTypesActions,
} from "@/services/productsService"
import { FormFooter, FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Drawer } from "antd"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

export const ProductTypeForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const isCreatingNew = searchParams.get("action") === "create_product_type"
	const typeId = searchParams.get("product_type_id")
	const { data: productsTypes, query: productsTypesQuery } =
		useGetProductsTypes()
	const { createProductType, updateProductType } = useGetProductsTypesActions()
	const { showNotification } = useGetNotification()

	const isDrawerOpen = isCreatingNew || !!typeId

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("product_type_id")
			return params
		})
	}

	const initialValues = useMemo(() => {
		if (!isCreatingNew && !typeId) {
			return {
				...EMPTY_PRODUCTS_TYPE,
				id: crypto.randomUUID(),
			}
		}
		const productType = productsTypes?.productTypes.find(
			(productType) => productType.id === typeId,
		)
		if (!productType) return EMPTY_PRODUCTS_TYPE
		return {
			description: productType.description,
			id: productType.id,
		}
	}, [typeId, isCreatingNew, productsTypes])

	const onSubmit = async (data: ProductTypeSchemaType) => {
		setIsLoading(true)
		const body = {
			description: data.description,
		}
		try {
			typeId
				? await updateProductType(typeId, body)
				: await createProductType(body)
			await productsTypesQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: isCreatingNew
					? "Tipo de produto criado com sucesso"
					: "Tipo de produto atualizado com sucesso",
				description: "",
			})
			handleCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: isCreatingNew
					? "Erro ao criar tipo de produto"
					: "Erro ao atualizar tipo de produto",
				description: parsedError ?? "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const methods = useForm<ProductTypeSchemaType>({
		resolver: yupResolver(productTypeSchema),
		values: initialValues,
		mode: "all",
	})

	return (
		<Drawer
			title={isCreatingNew ? "Novo tipo de produto" : "Editar tipo de produto"}
			open={isDrawerOpen}
			width={600}
			footer={false}
			onClose={handleCancel}
		>
			<FormStyled onSubmit={methods.handleSubmit(onSubmit)}>
				<Controller
					name={"description"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							required
							label={"Descrição"}
							placeholder={"Descrição do tipo de produto"}
							errorMessage={methods.formState.errors.description?.message}
							{...field}
						/>
					)}
				/>
				<FormFooter>
					<Button onClick={handleCancel}>Cancelar</Button>
					<Button
						className="button2"
						htmlType="submit"
						type="primary"
						disabled={
							!methods.formState.isValid ||
							productsTypesQuery.isLoading ||
							isLoading
						}
						loading={isLoading}
					>
						Salvar
					</Button>
				</FormFooter>
			</FormStyled>
		</Drawer>
	)
}
