import Login from './components/Login';
import GlobalStyle from './style/global';
function App() {
    return (
        <>
            <Login />
            <GlobalStyle themeDark={false} />
        </>
    );
}

export default App;
