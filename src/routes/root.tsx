import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Aside from '../components/Aside';
import HeaderNavAuth from '../components/HeaderNav';

const Root = () => {
    return (
        <>
            <Header>
                <HeaderNavAuth />
            </Header>
            <Aside />
            <Outlet />
        </>
    );
};

export default Root;
