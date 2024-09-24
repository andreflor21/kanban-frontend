import { isValidCEP } from "@/helpers/general"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type AddressViaCep = {
	bairro: string
	cep: string
	estado: string
	ddd: string
	complemento: string
	localidade: string
	logradouro: string
	regiao: string
	uf: string
}

type Uf = {
	id: string
	nome: string
	sigla: string
	regiao: {
		id: string
		nome: string
		sigla: string
	}
}

type City = {
	id: string
	nome: string
}

export const useGetAddressByCEP = (cep: string) => {
	const url = `https://viacep.com.br/ws/${cep}/json/`

	const query = useQuery({
		queryKey: [url],
		queryFn: () => axios.get<AddressViaCep>(url),
		enabled: isValidCEP(cep),
	})

	return {
		data: query.data?.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}

export const useGetUFs = () => {
	const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
	const query = useQuery({
		queryKey: [url],
		queryFn: () => axios.get<Uf[]>(url),
	})

	return {
		data: query.data?.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}

export const useGetCitiesByUF = (uf: string) => {
	const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
	const query = useQuery({
		queryKey: [url],
		queryFn: () => axios.get<City[]>(url),
	})

	return {
		data: query.data?.data,
		isLoading: query.isLoading,
		error: query.error,
		query,
	}
}
