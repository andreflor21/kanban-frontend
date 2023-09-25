import React, { useEffect, useRef } from 'react';
import { Container, MenuWrapper, MenuAnt } from './styles';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUsers } from '../../providers/User';
import {
    FileText,
    Gear,
    House,
    Kanban,
    Package,
    SignOut,
    Tag,
    Truck,
    User,
    Users,
} from 'phosphor-react';

import type { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
    title?: string,
    disabled?: boolean
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        title,
        disabled,
    } as MenuItem;
}
const HeaderNavAuth = () => {
    const history = useNavigate();
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const { user, userLogoff, idUser, username } = useUsers();
    const items: MenuItem[] = [
        getItem(
            <NavLink to="/dashboard">
                <span>Dashboard</span>
            </NavLink>,
            'dashboard',
            <House weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/materiais"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Materiais
            </NavLink>,
            'materiais',
            <Tag weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/pedidos"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Pedidos
            </NavLink>,
            'pedidos',
            <Package weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/kanbans"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Kanbans
            </NavLink>,
            'kanbans',
            <Kanban weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/fornecedores"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Fornecedores
            </NavLink>,
            'fornecedores',
            <Truck weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/notas"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Notas
            </NavLink>,
            'notas',
            <FileText weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            'Configurações',
            'configs',
            <Gear weight="regular" size={24} color={'#272F51'} />,
            [
                getItem(
                    <NavLink
                        to={'/configuracoes/perfil'}
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                    >
                        Perfil
                    </NavLink>,
                    'perfil',
                    <Users weight="regular" size={24} color={'#272F51'} />
                ),
                getItem(
                    <NavLink
                        to={'/configuracoes/usuarios'}
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                    >
                        Usuário
                    </NavLink>,
                    'usuario',
                    <User weight="regular" size={24} color={'#272F51'} />
                ),
            ]
        ),
        getItem(
            <NavLink
                to="/"
                onClick={userLogoff}
                className={({ isActive }) =>
                    isActive ? 'navlink--active' : ''
                }
            >
                Sair
            </NavLink>,
            'sair',
            <SignOut weight="regular" size={24} color={'#272F51'} />
        ),
    ];

    return (
        <Container>
            <p>{`Olá, ${username}`}</p>
            <MenuAnt mode="inline" items={items} />
        </Container>
    );
};

export default HeaderNavAuth;
