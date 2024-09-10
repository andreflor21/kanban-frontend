export type User = {
	id: string
	name: string
	email: string
	cpf: string | null
	code: string | null
	birthdate: string | null
	hashedPassword: string
	createdAt: string
	active: boolean
	changePassword: boolean
	profileId: string
	tokenReset: string | null
	tokenResetExpires: string | null
}
export interface UsuarioData {
	nome?: string
	email?: string
	senha?: string
	cpf?: string
	id: number | string
	dtNascimento?: string | null
	codigo?: string
	ativo?: boolean
	trocaSenha?: boolean
	tokenReset?: string
	tokenResetExpire?: string
	perfilId?: number | string
	perfil?: number | string
}
