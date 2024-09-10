import Aside from "@/components/Aside"
import Header from "@/components/Header"
import HeaderNavAuth from "@/components/HeaderNav"
import { useUserStore } from "@/stores/User/useUserStore"
import { Navigate, Outlet } from "react-router-dom"

const Root = () => {
	const token = useUserStore((state) => state.token)
	console.log(token)
	return token ? (
		<>
			<Header>
				<HeaderNavAuth />
			</Header>
			<Aside />
			<Outlet />
		</>
	) : (
		<Navigate to="/login" /> // Mostrar pagina de não autorizado e colocar um botao para redirecionar a tela de Login
	)
}

export default Root
