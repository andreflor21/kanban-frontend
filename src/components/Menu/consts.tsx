import {
	CirclesFour,
	CirclesThreePlus,
	DotsNine,
	FileText,
	Gear,
	House,
	Kanban,
	Package,
	Scales,
	ShoppingCart,
	ShoppingCartSimple,
	SignOut,
	Truck,
	User,
	Users,
} from "phosphor-react"

export const defaultMenuItems = [
	{
		key: "/dashboard",
		icon: <House weight="regular" size={24} color={"#272F51"} />,
		label: "Dashboard",
	},
	{
		key: "/produtos",
		icon: <ShoppingCart weight="regular" size={24} color={"#272F51"} />,
		label: "Produtos",
	},
	{
		key: "/pedidos",
		icon: <Package weight="regular" size={24} color={"#272F51"} />,
		label: "Pedidos",
	},
	{
		key: "/kanbans",
		icon: <Kanban weight="regular" size={24} color={"#272F51"} />,
		label: "Kanbans",
	},
	{
		key: "/secoes",
		icon: <CirclesThreePlus weight="regular" size={24} color={"#272F51"} />,
		label: "Seções",
		children: [
			{
				key: "/secoes",
				label: "Seções",
				icon: <CirclesFour weight="regular" size={24} color={"#272F51"} />,
			},
			{
				key: "/secoes/tipos",
				label: "Tipos",
				icon: <DotsNine weight="bold" size={24} color={"#272F51"} />,
			},
		],
	},
	{
		key: "/fornecedores",
		icon: <Truck weight="regular" size={24} color={"#272F51"} />,
		label: "Fornecedores",
	},
	{
		key: "/notas",
		icon: <FileText weight="regular" size={24} color={"#272F51"} />,
		label: "Notas",
	},
	{
		key: "/configuracoes",
		icon: <Gear weight="regular" size={24} color={"#272F51"} />,
		label: "Configurações",
		children: [
			{
				key: "/configuracoes/perfil",
				label: "Perfil",
				icon: <Users weight="regular" size={24} color={"#272F51"} />,
			},
			{
				key: "/configuracoes/usuarios",
				label: "Usuário",
				icon: <User weight="regular" size={24} color={"#272F51"} />,
			},
			{
				key: "/configuracoes/tipos-de-produtos",
				label: "Tipos de produto",
				icon: (
					<ShoppingCartSimple weight="regular" size={24} color={"#272F51"} />
				),
			},
			{
				key: "/configuracoes/unidades-de-medida",
				label: "Un de medida",
				icon: <Scales weight="regular" size={24} color={"#272F51"}/>,
			},
		],
	},
	{
		key: "/",
		icon: <SignOut weight="regular" size={24} color={"#272F51"} />,
		label: "Sair",
	},
] as const