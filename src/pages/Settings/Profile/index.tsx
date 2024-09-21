import { PageHeader } from "@/components/PageHeader"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { ProfilesTable } from "@/pages/Settings/Profile/ProfilesTable"
import { PageContainer } from "@/style/global"
import { Button } from "antd"
import { UserCirclePlus } from "phosphor-react"
import { useSearchParams } from "react-router-dom"

// import { Container } from './styles';

const Profile = () => {
	const [_, setSearchParams] = useSearchParams()

	const handleCreateProfile = () => {
		setSearchParams((params) => {
			params.set("action", "create_profile")
			return params
		})
	}

	return (
		<>
			<TitlePage title="Configurações" />
			<Title>Perfil</Title>
			<PageContainer>
				<PageHeader
					searchQuery={"profile"}
					placeholder={"Buscar perfil"}
					rightContent={
						<Button
							type="primary"
							icon={<UserCirclePlus size={20} />}
							onClick={handleCreateProfile}
						>
							Novo Perfil
						</Button>
					}
				/>
				<ProfilesTable />
			</PageContainer>
		</>
	)
}

export default Profile
