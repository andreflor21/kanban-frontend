import { useGetSuppliers } from "@/services/useGetSuppliers"

export const SuppliersTable = () => {
	const { data, isLoading, error } = useGetSuppliers()
	console.log(data, isLoading, error)
	return <div>SuppliersTable</div>
}
