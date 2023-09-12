import Rotas from './routes';
import GlobalStyle from './style/global';
function App() {
    return (
        <>
            <Rotas />
            <GlobalStyle themeDark={false} />
        </>
    );
}

export default App;
