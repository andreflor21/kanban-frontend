import LogoImg from "@/assets/logo.svg"
import Menu from "@/components/Menu"
import type { MenuProps } from "antd"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AsideContainer, ContainerLogo, Logo } from "./styles"

const Aside = () => {
	const [hovered, setHovered] = useState(false)
	const path = useLocation().pathname
	const navigate = useNavigate()

	const onClick: MenuProps["onClick"] = (e) => {
		navigate(e.key)
	}

	return (
		<AsideContainer
			className={hovered ? "hovered" : ""}
			onMouseEnter={() => {
				setHovered(true)
			}}
			onMouseLeave={() => {
				setTimeout(() => {
					setHovered(false)
				}, 500)
			}}
		>
			<div>
				<ContainerLogo>
					<Logo src={LogoImg} alt="Logo" />
					{hovered && <h3>Kanban</h3>}
				</ContainerLogo>
				<Menu
					mode="inline"
					className={`${!hovered ? "collapsed" : "open"} pc`}
					inlineCollapsed={!hovered}
					onClick={onClick}
					selectedKeys={[path]}
				/>
			</div>
		</AsideContainer>
	)
}

export default Aside
