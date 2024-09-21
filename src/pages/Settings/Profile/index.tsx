import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { ProfilesTable } from "@/pages/Settings/Profile/ProfilesTable"
import { useGetProfiles } from "@/services/profileServices" // import { Container } from './styles';
import { Container } from "./styles"

// import { Container } from './styles';

const Profile = () => {
	// const { getProfiles, profiles, deleteProfile } = useProfile()
	const { data, isLoading } = useGetProfiles()
	// console.log(data)

	// useEffect(() => {
	// 	// setLoad(false);
	// 	getProfiles(setLoad)
	// }, [getProfiles])

	const handleDelete = (id: number) => {
		// deleteProfile(id)
		console.log(id)
		// message.success('Usuário excluido');
	}
	return (
		<>
			<TitlePage title="Configurações" />
			<Title>Perfil</Title>
			<Container>
				{/*<ContainerButtons>*/}
				{/*	<LinkStyleld to="novo">*/}
				{/*		<span>Novo Perfil</span>*/}
				{/*		<Plus weight="bold" />*/}
				{/*	</LinkStyleld>*/}
				{/*	<LinkStyleld to="duplicar">*/}
				{/*		<span>Duplicar Perfil</span>*/}
				{/*		<Copy weight="fill" />*/}
				{/*	</LinkStyleld>*/}
				{/*</ContainerButtons>*/}
				<ProfilesTable />
				{/*<List*/}
				{/*	itemLayout="horizontal"*/}
				{/*	style={{*/}
				{/*		marginRight: "2rem",*/}
				{/*	}}*/}
				{/*	grid={{*/}
				{/*		gutter: 16,*/}
				{/*		xs: 1,*/}
				{/*		sm: 2,*/}
				{/*		md: 4,*/}
				{/*		lg: 4,*/}
				{/*		xl: 6,*/}
				{/*		xxl: 3,*/}
				{/*	}}*/}
				{/*	dataSource={profiles}*/}
				{/*	pagination={{ position: "bottom", align: "end" }}*/}
				{/*	renderItem={(profile, index) => (*/}
				{/*		<List.Item*/}
				{/*			actions={[*/}
				{/*				<Confirm*/}
				{/*					key={index}*/}
				{/*					title="Deseja excluir o usuário"*/}
				{/*					cancelText="Cancelar"*/}
				{/*					okText="Excluir"*/}
				{/*					placement="topRight"*/}
				{/*					// onConfirm={() =>*/}
				{/*					// 	// handleDelete(Number.parseInt(p.id as string))*/}
				{/*					// }*/}
				{/*					style={{ cursor: "pointer" }}*/}
				{/*					icon={<WarningCircle size={24} color={"#ef4444"} />}*/}
				{/*				>*/}
				{/*					<Tooltip title="Excluir">*/}
				{/*						<Trash size={18} style={{ cursor: "pointer" }} />*/}
				{/*					</Tooltip>*/}
				{/*				</Confirm>,*/}
				{/*			]}*/}
				{/*			style={{ fontFamily: "var(--font-standard)" }}*/}
				{/*		>*/}
				{/*			<Skeleton*/}
				{/*				loading={isLoading}*/}
				{/*				active*/}
				{/*				title*/}
				{/*				paragraph={{ rows: 2 }}*/}
				{/*				style={{ width: "50%" }}*/}
				{/*			>*/}
				{/*				<Card*/}
				{/*					title={*/}
				{/*						<Link to={`/configuracoes/perfil/${p.id}`}>*/}
				{/*							{p.description}*/}
				{/*						</Link>*/}
				{/*					}*/}
				{/*				>*/}
				{/*					{p.users.length > 0*/}
				{/*						? `${p.users.length} usuário(s) vinculado(s)`*/}
				{/*						: "Nenhum usuário vinculado"}*/}
				{/*				</Card>*/}
				{/*			</Skeleton>*/}
				{/*		</List.Item>*/}
				{/*	)}*/}
				{/*/>*/}
			</Container>
		</>
	)
}

export default Profile
