import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/Auth';
import { usePerfil } from '../../providers/Perfil';
import { useUsers } from '../../providers/User';
import { Usuario, UsuarioData } from '../../types/usuario';
import { Perfil } from '../../types/perfil';
import Input from '../Input';
import Button from '../Button';
import {
    FormStyled,
    LabelStyled,
    SelectStyled,
    ContainerSelect,
    OptionStyled,
    ContainerButtons,
} from './styles';
import { Checkbox } from '../Checkbox';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../ChangePassword';

interface FormUsuarioProps {
    usuario: Usuario | null;
    usuarioId: string;
}

export const FormUsuario = ({ usuario, usuarioId }: FormUsuarioProps) => {
    const { idUser } = useAuth();
    const { editUser } = useUsers();
    const navigate = useNavigate();
    const [readOnly] = useState(idUser !== parseInt(usuarioId) ? true : false);
    useEffect(() => {
        getPerfis();
    }, []);

    const { perfis, getPerfis } = usePerfil();
    const [nome, setNome] = useState(usuario?.nome);
    const [email, setEmail] = useState(usuario?.email);
    const [codigo, setCodigo] = useState(usuario?.codigo);
    const [ativo, setAtivo] = useState(usuario?.ativo);
    const [cpf, setCpf] = useState(usuario?.cpf);
    const [dtNascimento, setDtNascimento] = useState(usuario?.dtNascimento);
    const [perfil, setPerfil] = useState(usuario?.perfil?.id);
    const [nomeError, setNomeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [codigoError, setCodigoError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [dtNascimentoError, setDtNascimentoError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // console.log(nome, email, codigo, ativo, cpf, dtNascimento, perfil);

    const cpfMask = (cpf: string) => {
        if (cpf.length === 14) {
            cpf = cpf.replace(
                '(\\d{3})(\\d{3})(\\d{3})(\\d{2})',
                '$1.$2.$3-$4'
            );
            setCpf(cpf);
        } else {
            setCpf(cpf);
        }
    };
    const goBack = (path: string) => {
        navigate(path);
    };
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const updateObject: UsuarioData = {
            nome,
            email,
            codigo,
            ativo,
            cpf,
            dtNascimento: dtNascimento,
            perfilId: perfil,
        };

        const schema = yup.object().shape({
            nome: yup.string(),
            email: yup.string(),
            codigo: yup.string(),
            ativo: yup.boolean(),
            cpf: yup.string(),
            dtNascimento: yup.string(),
            perfilId: yup.number(),
        });

        await schema
            .validate({ ...updateObject })
            .then((v) => {
                editUser(v);
            })
            .catch(() => {
                nome === '' && setNomeError(true);
                email === '' && setEmailError(true);
                codigo === '' && setCodigoError(true);
                cpf === '' && setCpfError(true);
                dtNascimento === undefined && setDtNascimentoError(true);
            });
    };

    return (
        <>
            <FormStyled>
                <Input
                    label="Nome"
                    inputType="text"
                    placeholder="Digite seu nome"
                    errorMessage="Campo Obrigatório"
                    value={nome}
                    error={nomeError}
                    name="nome"
                    disabled={readOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setNome(e.target.value);
                        setNomeError(false);
                    }}
                />
                <Input
                    label="Email"
                    inputType="text"
                    placeholder="Digite seu email"
                    errorMessage="Campo Obrigatório"
                    value={email}
                    error={emailError}
                    name="email"
                    disabled={readOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(e.target.value);
                        setEmailError(false);
                    }}
                />
                <Input
                    label="CPF"
                    inputType="text"
                    placeholder="000.000.000-00"
                    errorMessage="Campo Obrigatório"
                    data-mask="000.000.000-00"
                    value={cpf}
                    error={cpfError}
                    disabled={readOnly}
                    name="cpf"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        cpfMask(e.target.value);
                        setCpfError(false);
                    }}
                />
                <Input
                    label="Código"
                    inputType="text"
                    placeholder="XXXXX"
                    errorMessage="Campo Obrigatório"
                    value={codigo}
                    error={codigoError}
                    name="codigo"
                    disabled={readOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCodigo(e.target.value);
                        setCodigoError(false);
                    }}
                />
                <Input
                    label="Data de Nascimento"
                    inputType="date"
                    placeholder="DD/MM/YYYY"
                    errorMessage="Campo Obrigatório"
                    value={dtNascimento?.split('T')[0]}
                    error={dtNascimentoError}
                    name="dtNascimento"
                    disabled={readOnly}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDtNascimento(e.target.value);
                        setDtNascimentoError(false);
                    }}
                />
                <Checkbox
                    label="Ativo"
                    name="ativo"
                    checked={ativo}
                    disabled={readOnly}
                    onCheckedChange={(checked) => {
                        if (checked === true) {
                            setAtivo(true);
                        } else {
                            setAtivo(false);
                        }
                    }}
                />
                <ContainerSelect className={readOnly ? 'disabled' : ''}>
                    <LabelStyled htmlFor="perfil">Perfil</LabelStyled>
                    <SelectStyled
                        id="perfil"
                        name="perfilId"
                        value={perfil}
                        disabled={readOnly}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setPerfil(e.target.value);
                        }}
                    >
                        <OptionStyled value="">Selecione o perfil</OptionStyled>
                        {perfis.map((p: Perfil) => (
                            <OptionStyled key={p.id} value={p.id}>
                                {p.descricao}
                            </OptionStyled>
                        ))}
                    </SelectStyled>
                </ContainerSelect>
                <ContainerButtons>
                    <Button
                        className="button1"
                        type="button"
                        onClickFunc={() => goBack('/configuracoes/usuarios')}
                    >
                        Voltar
                    </Button>
                    <Button
                        className="button2"
                        type="button"
                        disabled={readOnly}
                        onClickFunc={() => setIsModalOpen(!isModalOpen)}
                    >
                        Trocar Senha
                    </Button>
                    <Button
                        className="button3"
                        type="button"
                        disabled={readOnly}
                        onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleSubmit(e)
                        }
                    >
                        Atualizar
                    </Button>
                </ContainerButtons>
            </FormStyled>
            <ChangePassword
                idUser={parseInt(usuarioId)}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </>
    );
};
