import { NavLink } from 'react-router-dom';

interface AsideItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children?: React.ReactNode;
    path: string;
}

const AsideItem = ({ path, children, ...rest }: AsideItemProps) => {
    return (
        <NavLink to={path} {...rest}>
            {children}
        </NavLink>
    );
};
