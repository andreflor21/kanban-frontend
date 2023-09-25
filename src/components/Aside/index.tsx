import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    AsideContainer,
    MenuWrapper,
    Logo,
    ContainerLogo,
    MenuAnt,
} from './styles';
import LogoImg from '../../assets/logo.svg';
// import LogoAside from '../../asssets/svg/logo-white-aside.svg';
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

const Aside = () => {
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const { pathname } = useLocation();
    const [hovered, setHovered] = useState(false);
    const [current, setCurrent] = useState(pathname.substring(1));
    const { userLogoff } = useUsers();
    const items: MenuItem[] = [
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
            <Tag weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            <NavLink
                to="/pedidos"
                ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
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
                    'configuracoes/perfil',
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
                    'configuracoes/usuarios',
                    <User weight="regular" size={24} color={'#272F51'} />
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

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };
    return (
        <AsideContainer
            className={hovered ? 'hovered' : ''}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div>
                <ContainerLogo>
                    <Logo src={LogoImg} alt="Logo" />
                    {hovered ? <h3>Kanban</h3> : undefined}
                </ContainerLogo>
                <MenuAnt
                    mode="inline"
                    className={!hovered ? 'collapsed' : 'open'}
                    inlineCollapsed={!hovered}
                    items={items}
                    onClick={onClick}
                    selectedKeys={[current]}
                />
            </div>
        </AsideContainer>
    );
};

export default Aside;
