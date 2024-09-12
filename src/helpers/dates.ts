import dayjs from "dayjs"
import "dayjs/locale/pt-br"

type FormatDateProps = {
	date: string | Date | undefined
	formatAs?: string
	showHours?: boolean
}
dayjs.locale("pt-br")
export const formatDate = ({
	date,
	formatAs = "DD MMM YYYY",
	showHours = false,
}: FormatDateProps) => {
	if (!date) return ""
	const formatType = showHours ? `${formatAs} - HH:mm` : formatAs
	return dayjs(date).format(formatType)
}
