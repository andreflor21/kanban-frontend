import { UserForm } from '../../../../components/UserForm';
import { useParams } from 'react-router-dom';
import TitlePage from '../../../../components/TitlePage';
import Title from '../../../../components/Title';
import ProfileForm from '../../../../components/ProfileForm';

// import { Container } from './styles';

const ProfileDetails = () => {
    const { perfilId } = useParams();

    return (
        <>
            {perfilId && (
                <>
                    <TitlePage title="Configurações" />
                    <Title>Informações do Perfil</Title>
                    <ProfileForm profileId={perfilId} />
                </>
            )}
        </>
    );
};

export default ProfileDetails;
