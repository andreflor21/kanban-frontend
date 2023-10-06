import { useParams } from 'react-router-dom';
import TitlePage from 'components/TitlePage';
import ProfileForm from 'components/ProfileForm';

const ProfileDetails = () => {
    const { perfilId } = useParams();

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
    );
};

export default ProfileDetails;
