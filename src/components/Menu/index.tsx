import { type MenuItem, getItem } from "@/services/utils"
import { useUserStore } from "@/stores/User/useUserStore"
import type { MenuProps } from "antd"
import {
	CirclesFour,
	CirclesThreePlus,
	DotsNine,
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
} from "phosphor-react"
import { useRef } from "react"
import { NavLink } from "react-router-dom"
import { MenuAnt } from "./styles"

const Menu = ({ mode, className, items, ...rest }: MenuProps) => {
	const logout = useUserStore((state) => state.logout)
	const userLogoff = () => {
		logout()
	}

	const navLinks = useRef<HTMLAnchorElement[]>([])

	const defaultItems: MenuItem[] = [
		getItem(
			<NavLink
				to="/dashboard"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Dashboard
			</NavLink>,
			"dashboard",
			<NavLink
				to="/dashboard"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				<House weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			<NavLink
				to="/materiais"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Materiais
			</NavLink>,
			"materiais",
			<NavLink to="/materiais">
				<Tag weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			<NavLink
				to="/pedidos"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Pedidos
			</NavLink>,
			"pedidos",
			<NavLink to="/pedidos">
				<Package weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			<NavLink
				to="/kanbans"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Kanbans
			</NavLink>,
			"kanbans",
			<NavLink to="/kanbans">
				<Kanban weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			"Seções",
			"secoes",
			<NavLink to="/secoes">
				<CirclesThreePlus weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
			[
				getItem(
					<NavLink
						to="/secoes"
						ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
					>
						Seções
					</NavLink>,
					"secoes-sub",
					<NavLink to="/secoes">
						<CirclesFour weight="regular" size={24} color={"#272F51"} />
					</NavLink>,
				),
				getItem(
					<NavLink
						to="/secoes/tipos"
						ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
					>
						Tipos
					</NavLink>,
					"secoes-tipos",
					<NavLink to="/secoes/tipos">
						<DotsNine weight="bold" size={24} color={"#272F51"} />
					</NavLink>,
				),
			],
		),
		getItem(
			<NavLink
				to="/fornecedores"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Fornecedores
			</NavLink>,
			"fornecedores",
			<NavLink to="/fornecedores">
				<Truck weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			<NavLink
				to="/notas"
				ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
			>
				Notas
			</NavLink>,
			"notas",
			<NavLink to="/notas">
				<FileText weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
		getItem(
			"Configurações",
			"configs",
			<Gear weight="regular" size={24} color={"#272F51"} />,
			[
				getItem(
					<NavLink
						to={"/configuracoes/perfil"}
						ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
					>
						Perfil
					</NavLink>,
					"configuracoes/perfil",
					<NavLink to="/configuracoes/perfil">
						<Users weight="regular" size={24} color={"#272F51"} />
					</NavLink>,
				),
				getItem(
					<NavLink
						to={"/configuracoes/usuarios"}
						ref={(el: HTMLAnchorElement) => navLinks.current.push(el)}
					>
						Usuário
					</NavLink>,
					"configuracoes/usuarios",
					<NavLink to="/configuracoes/usuarios">
						<User weight="regular" size={24} color={"#272F51"} />
					</NavLink>,
				),
			],
		),
		getItem(
			<NavLink to="/" onClick={userLogoff}>
				Sair
			</NavLink>,
			"sair",
			<NavLink to="/" onClick={userLogoff}>
				<SignOut weight="regular" size={24} color={"#272F51"} />
			</NavLink>,
		),
	]
	return (
		<MenuAnt
			mode={mode}
			items={items ? items : defaultItems}
			className={className}
			{...rest}
		/>
	)
}

export default Menu
