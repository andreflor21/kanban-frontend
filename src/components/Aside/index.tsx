import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AsideContainer, MenuWrapper, Logo, ContainerLogo } from './styles';
import LogoImg from '../../assets/logo.svg';
// import LogoAside from '../../asssets/svg/logo-white-aside.svg';
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
const Aside = () => {
    const { pathname } = useLocation();
    const navLinks = useRef<HTMLAnchorElement[]>([]);
    const [topIndicator, setTopIndicator] = useState('0');
    const [leftIndicator, setLeftIndicator] = useState('-4px');
    const [hovered, setHovered] = useState(false);
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
            className={hovered ? 'hovered' : ''}
            // className="hovered"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <ContainerLogo>
                <Logo src={LogoImg} alt="Logo" />
                {hovered ? <h3>Kanban</h3> : undefined}
            </ContainerLogo>
            <div>
                <MenuWrapper
                    topIndicator={topIndicator}
                    leftIndicator={leftIndicator}
                >
                    <NavLink
                        to="/dashboard"
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <House weight="fill" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/materiais"
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <Tag weight="fill" />
                        <span>Materiais</span>
                    </NavLink>
                    <NavLink
                        to="/pedidos"
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <Package weight="fill" />
                        <span>Pedidos</span>
                    </NavLink>
                    <NavLink
                        to="/kanbans"
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <Kanban weight="fill" />
                        <span>Kanbans</span>
                    </NavLink>
                    <NavLink
                        to="/fornecedores"
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <Truck weight="fill" />
                        <span>Fornecedores</span>
                    </NavLink>
                    <NavLink
                        to={'/notas'}
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
                        className={({ isActive }) =>
                            isActive ? 'navlink--active' : ''
                        }
                    >
                        <FileText weight="fill" />
                        <span>Notas</span>
                    </NavLink>
                    <NavLink
                        to={'/configuracoes'}
                        ref={(el: HTMLAnchorElement) =>
                            navLinks.current.push(el)
                        }
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
                    <span className="indicator" ref={indicator}></span>
                </MenuWrapper>
            </div>
        </AsideContainer>
    );
};

export default Aside;
