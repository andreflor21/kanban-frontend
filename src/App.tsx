import GlobalStyle from './style/global';
import { useEffect } from 'react';
import { usePerfil } from '../src/providers/Perfil';
function App() {
    const { getPerfis } = usePerfil();
    useEffect(() => {
        getPerfis();
    }, []);
    return (
        <>
            <GlobalStyle themeDark={false} />
        </>
    );
}

export default App;
