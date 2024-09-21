import { InfoLine } from "@/components/InfoLine"
import { useGetProfiles } from "@/services/profileServices"
import { Divider, Drawer, Flex, List, Typography } from "antd"
import { useSearchParams } from "react-router-dom"

export const DetailsProfile = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const profileId = searchParams.get("profile_id")
	const { data: profiles } = useGetProfiles()
	const profile = profiles?.profiles.find((p) => p.id === profileId)
	const isDrawerOpen = !!profileId && !!profile?.id

	return (
		<Drawer
			title={`Detalhes do Perfil ${profile?.description}`}
			id="profile-details"
			placement="right"
			width={600}
			open={isDrawerOpen}
			onClose={() => {
				setSearchParams((params) => {
					params.delete("profile_id")
					return params
				})
			}}
		>
			<div>
				<InfoLine title={"Nome"}>{profile?.description}</InfoLine>
				<Divider variant={"solid"} />
				<div>
					<Typography.Title level={4}>Usuários</Typography.Title>
				</div>
				<List
					dataSource={profile?.users}
					renderItem={(item) => (
						<List.Item key={item.id}>
							<Flex flex={"1"} vertical>
								<InfoLine title={"Nome"}>{item.name}</InfoLine>
								<InfoLine title={"Email"} copyable>
									{item.email}
								</InfoLine>
							</Flex>
						</List.Item>
					)}
				/>
			</div>
		</Drawer>
	)
}
