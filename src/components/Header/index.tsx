import { HeaderBar, ResponsiveMenu, ResponsiveMenuContent } from './styles';
import Logo from '../../assets/logo.svg';
import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { List, X } from 'phosphor-react';

interface HeaderProps {
    auth?: boolean;
    children: ReactNode;
    whiteSchema?: boolean;
}

const Header = ({
    children,
    whiteSchema = false,
    auth = false,
}: HeaderProps) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <HeaderBar>
            <Link className="logo" to="/dashboard">
                <figure>
                    <img src={Logo} alt="Logo" />
                </figure>
                <h3>Kanban</h3>
            </Link>
            <nav className="desktop">{children}</nav>
            <>
                <ResponsiveMenu
                    onClick={() => setOpenMenu(!openMenu)}
                    openMenu={openMenu}
                >
                    {!openMenu ? <List size={32} /> : <X size={32} />}
                </ResponsiveMenu>
                <ResponsiveMenuContent openMenu={openMenu}>
                    {children}
                </ResponsiveMenuContent>
            </>
        </HeaderBar>
    );
};

export default Header;
