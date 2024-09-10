import Logo from "@/assets/logo.svg"
import { useUsers } from "@/providers/User"
import { List, X } from "phosphor-react"
import React, { type ReactNode, useState } from "react"
import { Link } from "react-router-dom"
import { HeaderBar, ResponsiveMenu, ResponsiveMenuContent } from "./styles"

interface HeaderProps {
	auth?: boolean
	children: ReactNode
}

const Header = ({ children, auth = false }: HeaderProps) => {
	const [openMenu, setOpenMenu] = useState(false)
	const { user } = useUsers()
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
					{!openMenu ? (
						<List size={32} />
					) : (
						<div>
							<p>{`Olá, ${user?.nome}`}</p>
							<X size={32} />
						</div>
					)}
				</ResponsiveMenu>
				<ResponsiveMenuContent openMenu={openMenu}>
					{children}
				</ResponsiveMenuContent>
			</>
		</HeaderBar>
	)
}

export default Header
