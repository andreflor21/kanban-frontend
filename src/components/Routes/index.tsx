import { useUsers } from "@/providers/User"
import type { Perfil } from "@/types/perfil"
import type { Rota } from "@/types/rota"
import { List, Skeleton, Switch, Tooltip, notification } from "antd"
import { Info, X } from "phosphor-react"
import React, { useEffect, useState } from "react"
import api from "../../services/api"
import { Container } from "./styles"

interface RoutesProps {
	profileId?: string
	profile?: Perfil
}

const colors = {
	get: "#34d399",
	post: "#FFE216",
	put: "#1677ff",
	patch: "#8b5cf6",
	delete: "#ef4444",
}

const Routes = ({ profileId, profile }: RoutesProps) => {
	const { token } = useUsers()
	const [activeRoutes, setActiveRoutes] = useState<Rota[]>([])
	const [load, setLoad] = useState(true)

	useEffect(() => {
		if (profileId) {
			api
				.get(`perfil/${profileId}/rotas`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					setActiveRoutes(res.data)
					setLoad(false)
				})
				.catch((e) => console.error(e))
		}
	}, [token, profileId])

	const handleChange = (checked: boolean, routeId: number | string) => {
		const updatedRotas = activeRoutes.map((rota) =>
			rota.id === routeId ? { ...rota, habilitada: checked } : rota,
		)
		setActiveRoutes(updatedRotas)
		if (checked) {
			api
				.post(
					`perfil/${profileId}/rota/${routeId}`,
					{},
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				.then(() =>
					notification.open({
						message: "Info",
						closeIcon: <X />,
						style: {
							WebkitBorderRadius: 4,
						},
						description: "Rota Habilitada",
						icon: <Info style={{ color: "var(--blue-400)" }} />,
					}),
				)
		} else {
			api
				.delete(`perfil/${profileId}/rota/${routeId}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then(() =>
					notification.open({
						message: "Info",
						closeIcon: <X />,
						style: {
							WebkitBorderRadius: 4,
						},
						description: "Rota Desabilitada",
						icon: <Info style={{ color: "var(--blue-400)" }} />,
					}),
				)
		}
	}

	return (
		<Container>
			<List
				header={
					<>
						<h3>Módulo</h3>
						<h3>Habilitado</h3>
					</>
				}
				itemLayout="horizontal"
				style={{
					width: "100%",
				}}
				dataSource={activeRoutes}
				pagination={{ position: "bottom", align: "end", pageSize: 10 }}
				renderItem={(r) => (
					<List.Item
						style={{ fontFamily: "var(--font-standard)" }}
						actions={[
							<Switch
								key={r.id}
								onChange={(checked: boolean) => {
									handleChange(checked, r.id)
								}}
								checked={r.habilitada}
							/>,
						]}
					>
						<Skeleton
							loading={load}
							active
							title
							paragraph={{ rows: 2 }}
							style={{ width: "50%" }}
						>
							<List.Item.Meta
								title={
									<Tooltip
										title={
											<p
												style={{
													color: "var(--gray-100)",
												}}
											>
												{r.caminho}{" "}
												<strong
													style={{
														color: colors[r.metodo as keyof typeof colors],
													}}
												>
													{r.metodo.toUpperCase()}
												</strong>
											</p>
										}
										// color="var(--slate-200)"
									>
										{r.descricao}
									</Tooltip>
								}
							/>
						</Skeleton>
					</List.Item>
				)}
			/>
		</Container>
	)
}

export default Routes
