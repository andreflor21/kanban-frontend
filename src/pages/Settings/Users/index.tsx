import Button from "@/components/Button"
import { Confirm } from "@/components/Confirm"
import NewUser from "@/components/NewUser"
import Title from "@/components/Title"
import TitlePage from "@/components/TitlePage"
import { List, Skeleton, Tooltip } from "antd"
import { Trash, UserPlus, WarningCircle } from "phosphor-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Container } from "./styles"

const Users = () => {
	// const { getAllUsers, users, deleteUser } = useUsers()

	const getAllUsers = () => {
		console.log("getAllUsers")
	}
	const users = () => {
		console.log("users")
	}

	const deleteUser = () => {
		console.log("deleteUser")
	}
	const [load, setLoad] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState(false)
	// useEffect(() => {
	// 	getAllUsers(setLoad)
	// 	// setLoad(false);
	// }, [getAllUsers])

	const handleDelete = (id: number) => {
		deleteUser(id)
		console.log(id)
		// message.success('Usuário excluido');
	}
	return (
		<>
			<TitlePage title="Configurações" />
			<Title>Usuários</Title>
			<Container>
				<Button type="button" onClickFunc={() => setIsModalOpen(!isModalOpen)}>
					Novo Usuário
					<UserPlus />
				</Button>
				<NewUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
				<List
					itemLayout="horizontal"
					style={{
						marginRight: "2rem",
					}}
					dataSource={users}
					pagination={{ position: "bottom", align: "end" }}
					renderItem={(u) => (
						<List.Item
							actions={[
								<Confirm
									key={u.id}
									title="Deseja excluir o usuário"
									cancelText="Cancelar"
									okText="Excluir"
									placement="topRight"
									onConfirm={() =>
										handleDelete(Number.parseInt(u.id as string))
									}
									style={{ cursor: "pointer" }}
									icon={<WarningCircle size={24} color={"#ef4444"} />}
								>
									<Tooltip title="Excluir">
										<Trash size={18} style={{ cursor: "pointer" }} />
									</Tooltip>
								</Confirm>,
							]}
							style={{ fontFamily: "var(--font-standard)" }}
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
										<Link to={`${u.id}`}>{`${
											u.codigo ? `${u.codigo} - ` : ""
										}${u.nome}`}</Link>
									}
									description={`${
										u.ativo ? "Ativo" : "Inativo"
									} - Perfil: ${u.perfil.descricao}`}
								/>
							</Skeleton>
						</List.Item>
					)}
				/>
			</Container>
		</>
	)
}

export default Users
