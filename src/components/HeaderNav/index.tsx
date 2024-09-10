import { useUserStore } from "@/stores/User/useUserStore"
import Menu from "../Menu"
import { Container } from "./styles"

const HeaderNavAuth = () => {
	// const { username } = useUsers()
	const user = useUserStore((state) => state.user)
	const username = user?.name
	return (
		<Container>
			<p>{`Olá, ${username}`}</p>
			<Menu mode="inline" className="mobile" />
		</Container>
	)
}

export default HeaderNavAuth
