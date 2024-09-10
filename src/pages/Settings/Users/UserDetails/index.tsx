import Title from "components/Title"
import TitlePage from "components/TitlePage"
import { UserForm } from "components/UserForm"
import { useParams } from "react-router-dom"

// import { Container } from './styles';

const UserDetails = () => {
	const { usuarioId } = useParams()

	return (
		<>
			{usuarioId && (
				<>
					<TitlePage title="Configurações" />
					<Title>Informações do Usuário</Title>
					<UserForm usuarioId={usuarioId} />
				</>
			)}
		</>
	)
}

export default UserDetails
