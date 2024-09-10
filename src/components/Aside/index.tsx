import LogoImg from "@/assets/logo.svg"
import Menu from "@/components/Menu"
import type { MenuProps } from "antd"
import { useState } from "react"
import { useLocation } from "react-router-dom"
import { AsideContainer, ContainerLogo, Logo } from "./styles"

const Aside = () => {
	const { pathname } = useLocation()
	const [hovered, setHovered] = useState(false)
	const [current, setCurrent] = useState(pathname.substring(1))

	const onClick: MenuProps["onClick"] = (e) => {
		setCurrent(e.key)
	}
	return (
		<AsideContainer
			className={hovered ? "hovered" : ""}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div>
				<ContainerLogo>
					<Logo src={LogoImg} alt="Logo" />
					{hovered ? <h3>Kanban</h3> : undefined}
				</ContainerLogo>
				<Menu
					mode="inline"
					className={`${!hovered ? "collapsed" : "open"} pc`}
					inlineCollapsed={!hovered}
					onClick={onClick}
					selectedKeys={[current]}
				/>
			</div>
		</AsideContainer>
	)
}

export default Aside
