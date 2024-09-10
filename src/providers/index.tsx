import type { ReactNode } from "react"

// import { AuthProvider } from './Auth';

interface ProviderProps {
	children: ReactNode
}

const Providers = ({ children }: ProviderProps) => {
	return children
	// return (<></>
	// 	// <AuthProvider>
	// 	// <UserProvider>
	// 	// <PerfilProvider>
	// 	// <SectionProvider>{children}</SectionProvider>
	// 	// </PerfilProvider>
	// 	// </UserProvider>
	// 	// </AuthProvider>
	// )
}

export default Providers
