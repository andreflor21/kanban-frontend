import ProfileForm from "@/components/ProfileForm"
import TitlePage from "@/components/TitlePage"
import { useParams } from "react-router-dom"

const NewProfile = () => {
	const { perfilId } = useParams()

	return (
		<>
			{perfilId && (
				<>
					<TitlePage title="Configurações" />

					<ProfileForm
						profileId={perfilId}
						title="Informações do Perfil"
						action="edit"
					/>
				</>
			)}
		</>
	)
}

export default NewProfile