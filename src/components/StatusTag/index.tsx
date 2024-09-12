import { Tag } from "antd"
import type React from "react"

export const StatusTag = ({ active }: { active: boolean }) => {
	const message = active ? "Ativo" : "Inativo"
	return <Tag color={active ? "green" : "red"}>{message}</Tag>
}
