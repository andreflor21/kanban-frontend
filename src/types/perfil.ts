import type { Rota } from "./rota"
import type { Usuario } from "./usuario"

export interface Perfil {
	id?: number | string
	descricao: string
	usuarios: Usuario[] | []
	rotas: Rota[] | []
}

export interface PerfilData {
	descricao: string
}
