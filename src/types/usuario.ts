import type { Route } from "@/services/routesServices"

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
	tokenReset: string | null
	tokenResetExpires: string | null
	profile: {
		description: string
		id: string
		routes: Route[]
	}
}
