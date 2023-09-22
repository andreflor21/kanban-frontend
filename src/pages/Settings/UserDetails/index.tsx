import { FormUsuario } from '../../../components/UsuarioForm';
import { useParams } from 'react-router-dom';
import TitlePage from '../../../components/TitlePage';
import Title from '../../../components/Title';

// import { Container } from './styles';

const UserDetails = () => {
    const { usuarioId } = useParams();

    return (
        <>
            {usuarioId && (
                <>
                    <TitlePage title="Configurações" />
                    <Title>Informações do Usuário</Title>
                    <FormUsuario usuarioId={usuarioId} />
                </>
            )}
        </>
    );
};

export default UserDetails;
