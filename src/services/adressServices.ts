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
