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
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

export const ProductForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { createProduct } = useGetProductsActions()
	const { query: productsQuery } = useGetProducts()
	const isCreatingNew = searchParams.get("action") === "create_product"
	const { showNotification } = useGetNotification()

	const handleClose = () => {
		setSearchParams((params) => {
			params.delete("action")
			return params
		})
	}

	const handleSubmit = async (data: ProductsSchemaType) => {
		setIsLoading(true)

		try {
			await createProduct(data)
			await productsQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Produto criado com sucesso",
				description: "",
			})
			handleClose()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao criar produto",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const methods = useForm<ProductsSchemaType>({
		resolver: yupResolver(productSchema),
		values: EMPTY_PRODUCTS,
		defaultValues: EMPTY_PRODUCTS,
		mode: "all",
	})

	console.log(methods.watch())
	console.log("erros", methods.formState.errors)
	console.log("isValid", methods.formState.isValid)

	return (
		<>
			<Drawer
				title="Novo Produto"
				open={isCreatingNew}
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
