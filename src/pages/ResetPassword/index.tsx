import { yupResolver } from "@hookform/resolvers/yup"
import imgForgotPassword from "assets/forgot_password.svg"
import Logo from "assets/logo.svg"

import Button from "@/components/Button"
import Input from "@/components/Input"
import { useUsers } from "@/providers/User"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import * as yup from "yup"
import {
	Container,
	ContainerForm,
	ContainerLogo,
	FormStyled,
	ImgStyled,
	InnerWrapper,
	LogoStyled,
	TextStyled,
	Title,
	Wrapper,
} from "./styles"

interface FormValues {
	password: string
	confirmPassword: string
}
const ResetPassword = () => {
	const { token } = useParams()
	// const [load, setLoad] = useState<boolean>(false)
	const { resetPassword } = useUsers()
	const navigate = useNavigate()
	const schema = yup.object().shape({
		password: yup.string().required("Campo obrigatório"),
		confirmPassword: yup
			.string()
			.oneOf([yup.ref("password")], "Senhas diferentes")
			.required("Campo obrigatório"),
	})
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	})

	const onSubmit = (data: FormValues) => {
		if (token) {
			resetPassword(token, data, navigate)
		}
	}
	return (
		<>
			<Container>
				<Wrapper>
					<ContainerLogo>
						<LogoStyled src={Logo} />
						<Title>Kanban</Title>
					</ContainerLogo>
					<InnerWrapper>
						<ImgStyled src={imgForgotPassword} />
					</InnerWrapper>
				</Wrapper>
				<ContainerForm>
					<TextStyled>Redefinir senha</TextStyled>
					<FormStyled onSubmit={handleSubmit(onSubmit)}>
						<Input
							inputType="password"
							label="Nova senha"
							placeholder="Digite sua senha"
							{...register("password")}
							error={!!errors.password}
							errorMessage={errors.password?.message}
						/>
						<Input
							inputType="password"
							label="Confirmar Senha"
							placeholder="Redigite sua senha"
							{...register("confirmPassword")}
							error={!!errors.confirmPassword}
							errorMessage={errors.confirmPassword?.message}
						/>

						<Button type="submit">Redefinir senha</Button>
					</FormStyled>
					{/* <LinkStyled href="/esqueci-minha-senha">
                        Esqueci minha senha
                    </LinkStyled> */}
				</ContainerForm>
			</Container>
		</>
	)
}

export default ResetPassword
