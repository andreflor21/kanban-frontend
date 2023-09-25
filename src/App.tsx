import GlobalStyle from './style/global';
import { useEffect } from 'react';
import { useProfile } from './providers/Profile';
import { useUsers } from './providers/User';
function App() {
    const { getProfiles } = useProfile();
    const { getAllUsers } = useUsers();
    useEffect(() => {
        getProfiles();
        getAllUsers();
    }, []);
    return (
        <>
            <GlobalStyle themeDark={false} />
        </>
    );
}

export default App;
