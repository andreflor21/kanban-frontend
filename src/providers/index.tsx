import type { ReactNode } from "react"
import { PerfilProvider } from "./Profile"
import { SectionProvider } from "./Sections"
// import { AuthProvider } from './Auth';
import { UserProvider } from "./User"

interface ProviderProps {
	children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
	return (
		// <AuthProvider>
		<UserProvider>
			<PerfilProvider>
				<SectionProvider>{children}</SectionProvider>
			</PerfilProvider>
		</UserProvider>
		// </AuthProvider>
	)
}

export default Providers
