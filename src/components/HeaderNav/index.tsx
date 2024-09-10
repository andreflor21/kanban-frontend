import { useUsers } from "providers/User"
import Menu from "../Menu"
import { Container } from "./styles"

const HeaderNavAuth = () => {
	const { username } = useUsers()
	return (
		<Container>
			<p>{`Olá, ${username}`}</p>
			<Menu mode="inline" className="mobile" />
		</Container>
	)
}

export default HeaderNavAuth
