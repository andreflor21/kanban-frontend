import { type GetProps, Typography } from "antd"
import type { ParagraphProps } from "antd/es/typography/Paragraph"
import type React from "react"
import * as S from "./styles"

type InfoLineProps = {
	title?: string
	children: React.ReactNode
} & GetProps<ParagraphProps>

const { Paragraph } = Typography
export const InfoLine = ({
	children,
	title,
	copyable = false,
	...rest
}: InfoLineProps) => {
	return (
		<S.InfoLineWrapper>
			{title?.length && (
				<Paragraph strong className={"lineTitle"} {...rest}>
					{title}
				</Paragraph>
			)}
			<Paragraph
				className={"lineContent"}
				{...(copyable && {
					copyable: {
						tooltips: false,
					},
				})}
				{...rest}
			>
				{children}
			</Paragraph>
		</S.InfoLineWrapper>
	)
}
