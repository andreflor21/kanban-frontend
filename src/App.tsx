import Login from './components/Login';
import Routes from './routes';
import GlobalStyle from './style/global';
function App() {
    return (
        <>
            <Routes />
            <GlobalStyle themeDark={false} />
        </>
    );
}

export default App;
