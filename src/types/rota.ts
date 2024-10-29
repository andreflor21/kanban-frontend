export interface Rota {
	id: number | string
	descricao: string
	caminho: string
	metodo: string
	habilitada: boolean
}

export type PaginatedResponse<T> = {
	currentPage: number
	totalPages: number
} & T
