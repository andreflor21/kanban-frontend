import { NewInput } from "@/components/NewInput"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	EMPTY_MESURE_UNIT,
	type MesureUnitSchemaType,
	mesureUnitSchema,
} from "@/pages/Settings/MesureUnits/mesureUnitForm/schema"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetProductsMesureUnits,
	useGetProductsMesureUnitsActions,
} from "@/services/productsService"
import { FormFooter, FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Drawer } from "antd"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

export const MesureUnitForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [isLoading, setIsLoading] = useState(false)
	const { showNotification } = useGetNotification()
	const { data: mesureUnits, query: mesureUnitsQuery } =
		useGetProductsMesureUnits()
	const { createProductMesureUnit, updateProductMesureUnit } =
		useGetProductsMesureUnitsActions()

	const isCreatingNew = searchParams.get("action") === "create_mesure_unit"
	const mesureUnitId = searchParams.get("mesure_unit_id")
	const isDrawerOpen = isCreatingNew || !!mesureUnitId

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("mesure_unit_id")
			return params
		})
	}

	const initialValues = useMemo(() => {
		if (!isCreatingNew && !mesureUnitId) {
			return {
				...EMPTY_MESURE_UNIT,
				id: crypto.randomUUID(),
			}
		}
		const mesureUnit = mesureUnits?.units.find(
			(mesureUnit) => mesureUnit.id === mesureUnitId,
		)
		if (!mesureUnit) return { ...EMPTY_MESURE_UNIT, id: crypto.randomUUID() }
		return {
			description: mesureUnit.description,
			abrev: mesureUnit.abrev,
			id: mesureUnit.id,
		}
	}, [mesureUnitId, isCreatingNew, mesureUnits])

	const onSubmit = async (data: MesureUnitSchemaType) => {
		setIsLoading(true)

		const body = {
			description: data.description,
			abrev: data.abrev,
		}

		try {
			mesureUnitId
				? await updateProductMesureUnit(mesureUnitId, body)
				: await createProductMesureUnit(body)
			await mesureUnitsQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: isCreatingNew
					? "Unidade de medida criada com sucesso"
					: "Unidade de medida atualizada com sucesso",
				description: "",
			})
			handleCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: isCreatingNew
					? "Erro ao criar unidade de medida"
					: "Erro ao atualizar unidade de medida",
				description: parsedError ?? "Verifique seus dados e tente novamente",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const methods = useForm<MesureUnitSchemaType>({
		resolver: yupResolver(mesureUnitSchema),
		values: initialValues,
		mode: "all",
	})

	return (
		<Drawer
			title={
				isCreatingNew ? "Novo unidade de medida" : "Editar unidade de medida"
			}
			open={isDrawerOpen}
			width={600}
			footer={false}
			onClose={handleCancel}
		>
			<FormStyled onSubmit={methods.handleSubmit(onSubmit)}>
				<Controller
					name={"abrev"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							required
							label={"Abreviação"}
							placeholder={"Abreviação da unidade de medida"}
							errorMessage={methods.formState.errors.abrev?.message}
							{...field}
						/>
					)}
				/>
				<Controller
					name={"description"}
					control={methods.control}
					render={({ field }) => (
						<NewInput
							label={"Descrição"}
							placeholder={"Descrição da unidade de medida"}
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
							mesureUnitsQuery.isLoading ||
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
