import { Container } from './styles';
import { useUsers } from '../../providers/User';
import Menu from '../Menu';

const HeaderNavAuth = () => {
    const { username } = useUsers();
    return (
        <Container>
            <p>{`Olá, ${username}`}</p>
            <Menu mode="inline" className="mobile" />
        </Container>
    );
};

export default HeaderNavAuth;
