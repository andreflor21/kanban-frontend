import { NewInput } from "@/components/NewInput"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	EMPTY_PRODUCTS,
	type ProductsSchemaType,
	productSchema,
} from "@/pages/Products/ProductForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetProducts,
	useGetProductsActions,
} from "@/services/productsService"
import { FormFooter, FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Drawer } from "antd"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

export const ProductForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { createProduct, updateProduct } = useGetProductsActions()
	const { query: productsQuery, data } = useGetProducts()
	const { showNotification } = useGetNotification()

	const isCreatingNew = searchParams.get("action") === "create_product"
	const editProductId = searchParams.get("edit_product_id")
	const product = data?.products.find((product) => product.id === editProductId)
	const isEditing = !!editProductId && !!product?.id

	const initialValues = useMemo(() => {
		if (!isEditing || !product) {
			return EMPTY_PRODUCTS
		}
		return {
			description: product?.description ?? "",
			code: product?.code ?? "",
			additionalDescription: product?.additionalDescription ?? "",
			stockUnit: product?.stockUnit ?? "",
			productType: product?.productType?.id ?? "",
			productGroup: product?.productGroup?.id ?? "",
		}
	}, [product, isEditing])

	const methods = useForm<ProductsSchemaType>({
		resolver: yupResolver(productSchema),
		values: initialValues,
		defaultValues: EMPTY_PRODUCTS,
		mode: "all",
	})

	const handleClose = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("edit_product_id")
			return params
		})
		methods.reset(EMPTY_PRODUCTS)
	}

	const handleSubmit = async (data: ProductsSchemaType) => {
		setIsLoading(true)

		try {
			isEditing
				? await updateProduct(editProductId, data)
				: await createProduct(data)

			await productsQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: isEditing
					? "Produto atualizado com sucesso"
					: "Produto criado com sucesso",
				description: "",
			})
			handleClose()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: isEditing
					? (parsedError ?? "Erro ao atualizar produto")
					: (parsedError ?? "Erro ao criar produto"),
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Drawer
				title={isCreatingNew ? "Novo Produto" : "Editar Produto"}
				open={isCreatingNew || isEditing}
				onClose={handleClose}
				width={600}
				footer={false}
			>
				<FormStyled onSubmit={methods.handleSubmit(handleSubmit)}>
					<Controller
						name={"description"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								required
								label={"Descrição"}
								placeholder={"Descrição do produto"}
								errorMessage={methods.formState.errors.description?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name={"code"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								required
								label={"Código"}
								placeholder={"Código do produto"}
								errorMessage={methods.formState.errors.code?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name={"additionalDescription"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								label={"Descrição adicional"}
								placeholder={"Descrição adicional do produto"}
								errorMessage={
									methods.formState.errors.additionalDescription?.message
								}
								{...field}
							/>
						)}
					/>

					<Controller
						name={"stockUnit"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								required
								label={"Unidade de estoque"}
								placeholder={"Unidade de estoque do produto"}
								errorMessage={methods.formState.errors.stockUnit?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name={"productType"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								required
								label={"Tipo de produto"}
								placeholder={"Tipo de produto"}
								errorMessage={methods.formState.errors.productType?.message}
								{...field}
							/>
						)}
					/>

					<Controller
						name={"productGroup"}
						control={methods.control}
						render={({ field }) => (
							<NewInput
								label={"Grupo de produtos"}
								placeholder={"Grupo de produtos"}
								errorMessage={methods.formState.errors.productGroup?.message}
								{...field}
							/>
						)}
					/>
					<FormFooter>
						<Button onClick={handleClose}>Cancelar</Button>
						<Button
							className="button2"
							htmlType="submit"
							type="primary"
							disabled={!methods.formState.isValid || isLoading}
							loading={isLoading}
						>
							Salvar
						</Button>
					</FormFooter>
				</FormStyled>
			</Drawer>
		</>
	)
}