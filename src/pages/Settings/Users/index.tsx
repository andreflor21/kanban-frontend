import NewUser from "@/components/NewUser"
import { PageHeader } from "@/components/PageHeader"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { UserList } from "@/pages/Settings/Users/UserList"
import { Button } from "antd"
import { UserPlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"
import { Container } from "./styles"

const Users = () => {
	const [_, setSearchParams] = useSearchParams()

	const handleCreateUser = () => {
		setSearchParams((params) => {
			params.set("action", "create_user")
			return params
		})
	}

	return (
		<>
			<TitlePage title="Configurações" />
			<Title>Usuários</Title>
			<Container>
				<PageHeader
					searchQuery={"user"}
					placeholder={"Buscar usuário"}
					rightContent={
						<>
							<Button
								type="primary"
								icon={<UserPlus />}
								onClick={handleCreateUser}
							>
								Novo Usuário
							</Button>
						</>
					}
				/>
				<NewUser />
				<UserList />
			</Container>
		</>
	)
}

export default Users
