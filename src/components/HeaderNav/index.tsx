import React, { useRef } from 'react';
import { Container, MenuWrapper } from './styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/Auth';
import {
    FileText,
    Gear,
    House,
    Kanban,
    Package,
    SignOut,
    Tag,
    Truck,
} from 'phosphor-react';

const HeaderNavAuth = () => {
    const history = useNavigate();
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const { user, userLogoff } = useAuth();

    return (
        <Container>
            <p>{`Olá, ${user?.nome}`}</p>
            <MenuWrapper>
                <NavLink
                    to="/dashboard"
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <House weight="fill" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to="/materiais"
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <Tag weight="fill" />
                    <span>Materiais</span>
                </NavLink>
                <NavLink
                    to="/pedidos"
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <Package weight="fill" />
                    <span>Pedidos</span>
                </NavLink>
                <NavLink
                    to="/kanbans"
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <Kanban weight="fill" />
                    <span>Kanbans</span>
                </NavLink>
                <NavLink
                    to="/fornecedores"
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <Truck weight="fill" />
                    <span>Fornecedores</span>
                </NavLink>
                <NavLink
                    to={'/notas'}
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <FileText weight="fill" />
                    <span>Notas</span>
                </NavLink>
                <NavLink
                    to={'/configuracoes'}
                    ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <Gear weight="fill" />
                    <span>Configurações</span>
                </NavLink>
                <NavLink
                    to={'/'}
                    onClick={userLogoff}
                    className={({ isActive }) =>
                        isActive ? 'navlink--active' : ''
                    }
                >
                    <SignOut weight="fill" />
                    <span>Sair</span>
                </NavLink>
            </MenuWrapper>
        </Container>
    );
};

export default HeaderNavAuth;
