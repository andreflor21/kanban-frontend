import {Popconfirm, type PopconfirmProps} from "antd"
import type React from "react"

interface ConfirmProps extends PopconfirmProps {
	children: React.ReactNode
}

export const Confirm = ({ children, ...rest }: ConfirmProps) => (
	<Popconfirm {...rest}>{children}</Popconfirm>
)
