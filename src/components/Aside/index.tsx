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
import { useAuth } from '../../providers/Auth';
import {
    CaretDown,
    CaretUp,
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
// const Aside = () => {
//     const { pathname } = useLocation();
//     const [topIndicator, setTopIndicator] = useState('0');
//     const navLinks = useRef<HTMLAnchorElement[]>([]);
//     const [leftIndicator, setLeftIndicator] = useState('-4px');
//     const [hovered, setHovered] = useState(false);
//     const [active, setActive] = useState(false);
//     const indicator = useRef<HTMLSpanElement>(null);
//     const { userLogoff } = useAuth();
//     const getDimensions = () => {
//         navLinks.current.forEach((item: HTMLAnchorElement) => {
//             if (item?.className === 'navlink--active') {
//                 const top = item.offsetTop;
//                 const left = item.offsetLeft;
//                 setLeftIndicator(`${left}px`);
//                 setTopIndicator(`${top}px`);
//             }
//         });
//     };

//     useEffect(() => {
//         setHovered(false);
//         getDimensions();

//         let timeoutId: NodeJS.Timeout;

//         const resizeListener = () => {
//             clearTimeout(timeoutId);
//             timeoutId = setTimeout(() => getDimensions(), 150);
//         };

//         window.onresize = () => {
//             resizeListener();
//         };

//         return () => {
//             window.onresize = () => {
//                 resizeListener();
//             };
//         };
//     }, [pathname]);
//     return (
//         <AsideContainer
//             className={hovered ? 'hovered' : ''}
//             // className="hovered"
//             // onMouseEnter={() => setHovered(true)}
//             // onMouseLeave={() => setHovered(false)}
//             onClick={() => setHovered(!hovered)}
//         >
//             <ContainerLogo>
//                 <Logo src={LogoImg} alt="Logo" />
//                 {hovered ? <h3>Kanban</h3> : undefined}
//             </ContainerLogo>
//             <div>
//                 <MenuWrapper
//                     topIndicator={topIndicator}
//                     leftIndicator={leftIndicator}
//                 >
//                     <NavLink
//                         to="/dashboard"
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <House weight="regular" />
//                         <span>Dashboard</span>
//                     </NavLink>
//                     <NavLink
//                         to="/materiais"
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <Tag weight="regular" />
//                         <span>Materiais</span>
//                     </NavLink>
//                     <NavLink
//                         to="/pedidos"
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <Package weight="regular" />
//                         <span>Pedidos</span>
//                     </NavLink>
//                     <NavLink
//                         to="/kanbans"
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <Kanban weight="regular" />
//                         <span>Kanbans</span>
//                     </NavLink>
//                     <NavLink
//                         to="/fornecedores"
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <Truck weight="regular" />
//                         <span>Fornecedores</span>
//                     </NavLink>
//                     <NavLink
//                         to={'/notas'}
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <FileText weight="regular" />
//                         <span>Notas</span>
//                     </NavLink>
//                     <NavLink
//                         to={'/configuracoes'}
//                         ref={(el: HTMLAnchorElement) =>
//                             navLinks.current.push(el)
//                         }
//                         className={({ isActive }) => {
//                             setActive(isActive);
//                             return isActive ? 'navlink--active' : '';
//                         }}
//                     >
//                         <Gear weight="regular" />
//                         <span>
//                             Configurações
//                             {/* <CaretUp
//                                 weight="light"
//                                 className={active ? 'show' : 'hide'}
//                             /> */}
//                             {/* <CaretDown
//                                 weight="light"
//                                 className={active ? 'hide' : 'show'}
//                             /> */}
//                         </span>
//                     </NavLink>
//                     <NavLink
//                         to={'/'}
//                         onClick={userLogoff}
//                         className={({ isActive }) =>
//                             isActive ? 'navlink--active' : ''
//                         }
//                     >
//                         <SignOut weight="regular" />
//                         <span>Sair</span>
//                     </NavLink>
//                     <span className="indicator" ref={indicator}></span>
//                 </MenuWrapper>
//             </div>
//         </AsideContainer>
//     );
// };

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const Aside = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { pathname } = useLocation();
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const [topIndicator, setTopIndicator] = useState('0');
    const [leftIndicator, setLeftIndicator] = useState('-4px');
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const indicator = useRef<HTMLSpanElement>(null);
    const { userLogoff } = useAuth();
    const getDimensions = () => {
        navLinks.current.forEach((item: HTMLAnchorElement) => {
            if (item?.className === 'navlink--active') {
                const top = item.offsetTop;
                const left = item.offsetLeft;
                setLeftIndicator(`${left}px`);
                setTopIndicator(`${top}px`);
            }
        });
    };
    const items: MenuItem[] = [
        getItem(
            <NavLink
                to={'/dashboard'}
                // ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
            >
                Dashboard
            </NavLink>,
            '1',
            <House weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            'Materiais',
            '2',
            <Tag weight="regular" size={24} color={'#272F51'} />
        ),
        getItem(
            'Pedidos',
            '3',
            <Package weight="regular" size={24} color={'#272F51'} />
        ),

        getItem(
            'Kanbans',
            'sub1',
            <Kanban weight="regular" size={24} color={'#272F51'} />,
            [
                getItem('Option 5', '5'),
                getItem('Option 6', '6'),
                getItem('Option 7', '7'),
                getItem('Option 8', '8'),
            ]
        ),

        getItem(
            'Configurações',
            'sub2',
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
                    '9',
                    <Users weight="regular" size={24} color={'#272F51'} />
                ),
                getItem(
                    <NavLink
                        to={'/configuracoes/usuario'}
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                    >
                        Usuário
                    </NavLink>,
                    '10',
                    <User weight="regular" size={24} color={'#272F51'} />
                ),
            ]
        ),
    ];

    useEffect(() => {
        setHovered(false);
        getDimensions();

        let timeoutId: NodeJS.Timeout;

        const resizeListener = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => getDimensions(), 150);
        };

        window.onresize = () => {
            resizeListener();
        };

        return () => {
            window.onresize = () => {
                resizeListener();
            };
        };
    }, [pathname]);
    return (
        <AsideContainer
            className={hovered ? 'hovered' : 'hovered'}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div>
                <ContainerLogo>
                    <Logo src={LogoImg} alt="Logo" />
                    {hovered ? <h3>Kanban</h3> : undefined}
                </ContainerLogo>
                <MenuAnt mode="inline" inlineCollapsed={false} items={items} />
            </div>
        </AsideContainer>
    );
};

export default Aside;
