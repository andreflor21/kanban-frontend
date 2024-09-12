import Aside from "@/components/Aside"
import Header from "@/components/Header"
import HeaderNavAuth from "@/components/HeaderNav"
import { isValidToken } from "@/helpers/general"
import { useGetUserData } from "@/services/userServices"
import { type DecodedToken, useUserStore } from "@/stores/User/useUserStore"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

const useValidateToken = () => {
	const token = localStorage.getItem("@kanban/token")
	const isTokenValid = token ? isValidToken(token) : false
	const navigate = useNavigate()
	const user = useUserStore((state) => state.user)
	const setUser = useUserStore((state) => state.setUser)
	const setToken = useUserStore((state) => state.setToken)

	const decodedToken: DecodedToken | undefined = token?.length
		? jwtDecode(token)
		: undefined
	const query = useGetUserData({
		id: decodedToken?.sing?.id,
		token: token,
	})

	useEffect(() => {
		if (!isTokenValid) {
			localStorage.removeItem("@kanban/token")
			navigate("/login")
		}
		if (query?.data?.id && !user && token) {
			setUser(query.data)
			setToken(token)
		}
	}, [navigate, isTokenValid, query, token, user, setUser, setToken])
}

const Root = () => {
	useValidateToken()

	return (
		<>
			<Header>
				<HeaderNavAuth />
			</Header>
			<Aside />
			<Outlet />
		</>
	)
}

export default Root
