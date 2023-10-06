import {
    CirclesThreePlus,
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
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import { useUsers } from 'providers/User';
import { MenuAnt } from './styles';

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

const Menu = ({ mode, className, items, ...rest }: MenuProps) => {
    const { userLogoff } = useUsers();
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const defaultItems: MenuItem[] = [
        getItem(
            <NavLink
                to="/dashboard"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Dashboard
            </NavLink>,
            'dashboard',
            <NavLink
                to="/dashboard"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                <House weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/materiais"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Materiais
            </NavLink>,
            'materiais',
            <NavLink to="/materiais">
                <Tag weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/pedidos"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Pedidos
            </NavLink>,
            'pedidos',
            <NavLink to="/pedidos">
                <Package weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/kanbans"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Kanbans
            </NavLink>,
            'kanbans',
            <NavLink to="/kanbans">
                <Kanban weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/secoes"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Seções
            </NavLink>,
            'secoes',
            <NavLink to="/secoes">
                <CirclesThreePlus
                    weight="regular"
                    size={24}
                    color={'#272F51'}
                />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/fornecedores"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Fornecedores
            </NavLink>,
            'fornecedores',
            <NavLink to="/fornecedores">
                <Truck weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
        getItem(
            <NavLink
                to="/notas"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Notas
            </NavLink>,
            'notas',
            <NavLink to="/notas">
                <FileText weight="regular" size={24} color={'#272F51'} />
            </NavLink>
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
                    'configuracoes/perfil',
                    <NavLink to="/configuracoes/perfil">
                        <Users weight="regular" size={24} color={'#272F51'} />
                    </NavLink>
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
                    'configuracoes/usuarios',
                    <NavLink to="/configuracoes/usuarios">
                        <User weight="regular" size={24} color={'#272F51'} />
                    </NavLink>
                ),
            ]
        ),
        getItem(
            <NavLink to="/" onClick={userLogoff}>
                Sair
            </NavLink>,
            'sair',
            <NavLink to="/" onClick={userLogoff}>
                <SignOut weight="regular" size={24} color={'#272F51'} />
            </NavLink>
        ),
    ];
    return (
        <MenuAnt
            mode={mode}
            items={items ? items : defaultItems}
            className={className}
            {...rest}
        />
    );
};

export default Menu;
