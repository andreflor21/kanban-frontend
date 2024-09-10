import type { Rota } from "./rota"
import type { User } from "./usuario"

export interface Perfil {
	id?: number | string
	descricao: string
	usuarios: User[] | []
	rotas: Rota[] | []
}

export interface PerfilData {
	descricao: string
}
