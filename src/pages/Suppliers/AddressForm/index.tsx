import { LabelStyled } from "@/components/Input/styles"
import { cepMask, isValidCEP, onlyNumbersCep } from "@/helpers/general"
import { addressSchema, type AddressSchemaType, EMPTY_ADDRESS, } from "@/pages/Suppliers/AddressForm/schema"
import { useGetAddressByCEP } from "@/services/adressServices"
import { useGetSuppliers } from "@/services/useGetSuppliers"
import { FormStyled } from "@/style/global"
import { yupResolver } from "@hookform/resolvers/yup"
import { Input as AntInput, Modal } from "antd"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"
import * as S from "./styles"

export const AddressForm = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const [cep, setCep] = useState("")

	const { data: suppliers } = useGetSuppliers()
	const { data: addressByCep, isLoading } = useGetAddressByCEP(cep)

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

	// console.log("initial", initialValues)
	// console.log("cep", cep)

	const handleCancel = () => {
		setSearchParams((params) => {
			params.delete("action")
			params.delete("address_id")
			return params
		})
	}

	const { register, setValue, watch, trigger } = useForm<AddressSchemaType>({
		resolver: yupResolver(addressSchema),
		values: initialValues,
	})

	useEffect(() => {
		console.count("useEffect")
		if (
			!isLoading &&
			addressByCep?.cep &&
			onlyNumbersCep(addressByCep.cep) === cep
		) {
			console.count("setValue")
			setValue("zipcode", addressByCep.cep)
			setValue("city", addressByCep.localidade)
			setValue("state", addressByCep.uf)
			setValue("district", addressByCep.bairro)
			setValue("lograd", addressByCep.logradouro)
			setCep("")
		}
	}, [isLoading, addressByCep, cep, setValue])

	// console.log("valores", watch())

	return (
		<Modal
			open={isModalOpen}
			title={isCreatingNew ? "Novo endereço" : "Editar endereço"}
			onCancel={handleCancel}
		>
			<FormStyled>
				<S.FormLine>
					<LabelStyled htmlFor={"cep"}>CEP</LabelStyled>
					<AntInput.Search
						size={"large"}
						name={"cep"}
						loading={isLoading}
						onChange={(e) => {
							setCep(onlyNumbersCep(e.target.value))
							if (isValidCEP(e.target.value)) {
							}
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
						disabled={isLoading}
						{...register("lograd")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"number"}>Número</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Número"}
						disabled={isLoading}
						{...register("number")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"complement"}>Complemento</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Complemento"}
						disabled={isLoading}
						{...register("complement")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"district"}>Bairro</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Bairro"}
						disabled={isLoading}
						{...register("district")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"city"}>Cidade</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Cidade"}
						disabled={isLoading}
						{...register("city")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"state"}>Estado</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Estado"}
						disabled={isLoading}
						{...register("state")}
					/>
				</S.FormLine>
				<S.FormLine>
					<LabelStyled htmlFor={"addressType"}>Tipo de endereço</LabelStyled>
					<AntInput
						size={"large"}
						placeholder={"Tipo de endereço"}
						disabled={isLoading}
						{...register("addressType")}
					/>
				</S.FormLine>
			</FormStyled>
			teste
		</Modal>
	)
}
