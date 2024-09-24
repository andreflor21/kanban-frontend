import { LabelStyled } from "@/components/Input/styles"
import { cepMask, onlyNumbersCep } from "@/helpers/general"
import { useGetNotification } from "@/hooks/useGetNotification"
import {
	type AddressSchemaType,
	EMPTY_ADDRESS,
	addressSchema,
} from "@/pages/Suppliers/AddressForm/schema"
import {
	useGetAddressByCEP,
	useGetCitiesByUF,
	useGetUFs,
} from "@/services/adressServices"
import { type ErrorExtended, parseError } from "@/services/api"
import {
	useGetSuppliers,
	useGetSuppliersActions,
} from "@/services/useGetSuppliers"
import { FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input as AntInput, Modal, Select } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

export const AddressForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [loadingPost, setLoadingPost] = useState(false)
	const [cep, setCep] = useState("")
	const [uf, setUf] = useState("")

	const { data: suppliers, query: suppliersQuery } = useGetSuppliers()
	const { addAddress, editAddress } = useGetSuppliersActions()
	const { data: addressByCep, isLoading: isLoadingCEP } =
		useGetAddressByCEP(cep)
	const { data: ufs, isLoading: isLoadingUFs } = useGetUFs()
	const { data: cities, isLoading: isLoadingCities } = useGetCitiesByUF(uf)
	const { showNotification } = useGetNotification()

	const action = searchParams.get("action")
	const isCreatingNew = action === "create_address"
	const isEditing = action === "edit_address"
	const addressId = searchParams.get("address_id")
	const supplierId = searchParams.get("supplier_id")

	const supplier = suppliers?.suppliers.find(
		(supplier) => supplier.id === supplierId,
	)
	const address = supplier?.addresses?.find(
		(address) => address.id === addressId,
	)

	const isModalOpen =
		isCreatingNew || (isEditing && !!addressId && !!address?.id)

	const initialValues = useMemo(() => {
		if (!isEditing || !address) {
			return EMPTY_ADDRESS
		}

		if (address.zipcode) {
			setCep(address.zipcode)
		}

		return {
			lograd: address?.lograd ?? "",
			number: address?.number ?? "",
			zipcode: address?.zipcode ?? "",
			city: address?.city ?? "",
			state: address?.state ?? "",
			district: address?.district ?? "",
			complement: address?.complement ?? "",
			addressType: address?.addressType?.description ?? "",
		}
	}, [address, isEditing])

	const {
		setValue,
		watch,
		trigger,
		reset,
		getValues,
		formState: { isValid },
	} = useForm<AddressSchemaType>({
		resolver: yupResolver(addressSchema),
		values: initialValues,
		defaultValues: EMPTY_ADDRESS,
	})

	useEffect(() => {
		if (
			!isLoadingCEP &&
			addressByCep?.cep &&
			onlyNumbersCep(addressByCep.cep) === cep
		) {
			setValue("city", addressByCep.localidade)
			setValue("state", addressByCep.uf)
			setValue("district", addressByCep.bairro)
			setValue("lograd", addressByCep.logradouro)
		}
	}, [isLoadingCEP, addressByCep, cep, setValue])

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("address_id")
			return params
		})
		reset(EMPTY_ADDRESS)
		setCep("")
		setUf("")
	}

	const handleSubmit = async () => {
		const addressType = getValues("addressType")
		const values = {
			...getValues(),
			addressType: { description: addressType },
		}

		if (!supplierId) return
		setLoadingPost(true)

		try {
			await addAddress(supplierId, values)
			await suppliersQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Endereço adicionado com sucesso",
				description: "",
			})
			handleCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao adicionar endereço",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setLoadingPost(false)
		}
	}

	const handleEdit = async () => {
		const addressType = getValues("addressType")
		const values = {
			...getValues(),
			addressType: { description: addressType },
		}

		if (!supplierId || !addressId) return
		setLoadingPost(true)

		try {
			await editAddress(supplierId, addressId, values)
			await suppliersQuery.refetch()
			showNotification({
				type: "SUCCESS",
				message: "Endereço atualizado com sucesso",
				description: "",
			})
			handleCancel()
		} catch (err) {
			const parsedError = parseError(err as ErrorExtended)
			showNotification({
				type: "ERROR",
				message: parsedError ?? "Erro ao atualizar endereço",
				description: "Verifique seus dados e tente novamente",
			})
		} finally {
			setLoadingPost(false)
		}
	}
	return (
		<Modal
			open={isModalOpen}
			title={isCreatingNew ? "Novo endereço" : "Editar endereço"}
			onCancel={handleCancel}
			okText={isCreatingNew ? "Adicionar endereço" : "Salvar"}
			onOk={isEditing ? handleEdit : handleSubmit}
			okButtonProps={{ loading: loadingPost, disabled: !isValid }}
		>
			<FormStyled>
				<S.FormLine>
					<LabelStyled htmlFor={"cep"}>CEP</LabelStyled>
					<AntInput.Search
						size={"large"}
						name={"cep"}
						loading={isLoadingCEP || loadingPost}
						onChange={(e) => {
							setCep(onlyNumbersCep(e.target.value))
							setValue("zipcode", onlyNumbersCep(e.target.value))
							trigger("zipcode")
						}}
						value={cepMask(watch("zipcode"))}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"lograd"}>Rua</LabelStyled>

					<AntInput
						size={"large"}
						placeholder={"Rua"}
						disabled={isLoadingCEP || loadingPost}
						onChange={(e) => {
							setValue("lograd", e.target.value)
							trigger("lograd")
						}}
						value={watch("lograd")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"number"}>Número</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Número"}
						disabled={isLoadingCEP || loadingPost}
						onChange={(e) => {
							setValue("number", e.target.value)
							trigger("number")
						}}
						value={watch("number")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"complement"}>Complemento</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Complemento"}
						disabled={isLoadingCEP || loadingPost}
						onChange={(e) => {
							setValue("complement", e.target.value)
							trigger("complement")
						}}
						value={watch("complement")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"district"}>Bairro</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Bairro"}
						disabled={isLoadingCEP || !!addressByCep?.bairro || loadingPost}
						onChange={(e) => {
							setValue("district", e.target.value)
							trigger("district")
						}}
						value={watch("district")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"state"}>Estado</LabelStyled>
					<Select
						showSearch
						size={"large"}
						options={ufs?.map((uf) => ({
							label: uf.sigla,
							value: uf.sigla,
						}))}
						onChange={(value) => {
							setUf(value)
							setValue("state", value)
							setValue("city", "")
							trigger(["state", "city"])
						}}
						placeholder={"Selecione o estado"}
						value={watch("state")}
						disabled={!!addressByCep?.uf || loadingPost}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"city"}>Cidade</LabelStyled>
					<Select
						showSearch
						size={"large"}
						options={cities?.map((city) => ({
							label: city.nome,
							value: city.nome,
						}))}
						onChange={(value) => {
							setValue("city", value)
							trigger("city")
						}}
						placeholder={"Selecione a cidade"}
						value={watch("city")}
						disabled={
							!!addressByCep?.localidade || isLoadingCities || loadingPost
						}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"addressType"}>Tipo de endereço</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Tipo de endereço"}
						disabled={isLoadingCEP || loadingPost}
						onChange={(e) => {
							setValue("addressType", e.target.value)
							trigger("addressType")
						}}
						value={watch("addressType")}
					/>
				</S.FormLine>
			</FormStyled>
		</Modal>
	)
}
