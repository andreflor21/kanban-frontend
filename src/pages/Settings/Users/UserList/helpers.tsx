import { StatusTag } from "@/components/StatusTag"
import type { TableDataType } from "@/pages/Settings/Users/UserList/index"
import * as S from "@/pages/Settings/Users/UserList/styles"
import type { Profile } from "@/services/profileServices"
import type { User } from "@/types/usuario"
import { Tag } from "antd"
import type React from "react"

const ProfileTag = ({ profile }: { profile: string }) => {
	const color = profile.toLowerCase() === "admin" ? "purple" : "default"
	return <Tag color={color}>{profile}</Tag>
}

export const getDataToShow = (
	data: User[] | undefined,
	profiles: Profile[] | undefined,
	query: string,
	currentUser: User | undefined,
): TableDataType[] => {
	if (!data) return []
	const values = data.map((user) => {
		const userProfile = profiles?.find((p) => p.id === user.profileId)
		const isCurrentUser = user.id === currentUser?.id
		return {
			user: user,
			id: user.id,
			name: user.name,
			email: user.email,
			active: <StatusTag key={user.id} active={user.active} />,
			profileTag: (
				<ProfileTag
					profile={userProfile?.description ?? "Desconhecido"}
					key={user.id}
				/>
			),
			profileId: user.profileId,
			nameDisplay: (
				<S.UserWrapper key={user.id}>
					{user.name}
					{isCurrentUser && <Tag color={"green"}>Você</Tag>}
				</S.UserWrapper>
			),
		}
	})

	if (!query?.length) return values
	return values.filter((user) =>
		user.name.toLowerCase().includes(query.toLowerCase()),
	)
}
