import type { ReactNode } from "react"
import { TitleStyled } from "./styles"

interface TitleProps {
	children: ReactNode
}

const Title = ({ children }: TitleProps) => {
	return <TitleStyled>{children}</TitleStyled>
}

export default Title
