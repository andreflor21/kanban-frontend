import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useAuth } from '../../providers/Auth';
import { usePerfil } from '../../providers/Perfil';
import { useUsers } from '../../providers/User';
import { UsuarioData } from '../../types/usuario';
import { Perfil } from '../../types/perfil';
import Input from '../Input';
import Button from '../Button';
import {
    FormStyled,
    LabelStyled,
    SelectStyled,
    ContainerSelect,
    OptionStyled,
} from './styles';
import SelectInput from '../SelectInput';
import { Checkbox } from '../Checkbox';

interface Option {
    id: string;
    descricao: string;
}

export const FormUsuario = () => {
    const { user, idUser, setUser } = useAuth();
    const { editUser, getUser } = useUsers();
    // console.log(user);

    useEffect(() => {
        if (!user) {
            const u = localStorage.getItem('@kanban/usuario');
            if (u) {
                setUser(JSON.parse(u));
            }
        }
    }, [user]);

    const { perfis } = usePerfil();
    const [nome, setNome] = useState<string>(user?.nome);
    const [email, setEmail] = useState<string>(user?.email);
    const [codigo, setCodigo] = useState<string>(user?.codigo);
    const [ativo, setAtivo] = useState<boolean>(user?.ativo);
    const [cpf, setCpf] = useState<string>(user?.cpf);
    const [dtNascimento, setDtNascimento] = useState<string>(
        user?.dtNascimento
    );
    const [senha, setSenha] = useState<string>(user?.senha);
    const [perfil, setPerfil] = useState<number | string>(user?.perfil?.id);
    const [nomeError, setNomeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [codigoError, setCodigoError] = useState(false);
    const [ativoError, setAtivoError] = useState(false);
    const [cpfError, setCpfError] = useState(false);
    const [dtNascimentoError, setDtNascimentoError] = useState(false);
    const [senhaError, setSenhaError] = useState(false);
    const [perfilError, setPerfilError] = useState(false);

    console.log(nome, email, codigo, ativo, cpf, dtNascimento, perfil);

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
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const updateObject: UsuarioData = {
            nome,
            email,
            codigo,
            ativo,
            cpf,
            dtNascimento: dtNascimento + 'T00:00:00.000Z',
            senha,
            perfilId: perfil,
        };

        const schema = yup.object().shape({
            nome: yup.string(),
            email: yup.string(),
            codigo: yup.string(),
            ativo: yup.boolean(),
            cpf: yup.string(),
            dtNascimento: yup.string(),
            senha: yup.string(),
            perfilId: yup.number(),
        });

        await schema
            .validate({ ...updateObject })
            .then((v) => {
                editUser(v);
            })
            .catch((e) => {
                nome === '' && setNomeError(true);
                email === '' && setEmailError(true);
                codigo === '' && setCodigoError(true);
                ativo === undefined && setAtivoError(true);
                cpf === '' && setCpfError(true);
                dtNascimento === undefined && setDtNascimentoError(true);
                senha === '' && setSenhaError(true);
                perfil === 0 && setPerfilError(true);
            });
    };

    return (
        <FormStyled>
            <Input
                label="Nome"
                inputType="text"
                placeholder="Digite seu nome"
                errorMessage="Campo Obrigatório"
                value={nome}
                error={nomeError}
                name="nome"
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDtNascimento(e.target.value);
                    setDtNascimentoError(false);
                }}
            />
            <Input
                label="Senha"
                inputType="password"
                placeholder="Digite sua senha"
                errorMessage="Campo Obrigatório"
                value={senha}
                error={senhaError}
                name="senha"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDtNascimento(e.target.value);
                    setDtNascimentoError(false);
                }}
            />
            <Checkbox
                label="Ativo"
                name="ativo"
                checked={ativo}
                onCheckedChange={(checked) => {
                    if (checked === true) {
                        setAtivo(true);
                    } else {
                        setAtivo(false);
                    }
                }}
            />
            <ContainerSelect>
                <LabelStyled htmlFor="perfil">Perfil</LabelStyled>
                <SelectStyled
                    id="perfil"
                    name="perfilId"
                    value={perfil}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setPerfil(e.target.value);
                        setPerfilError(false);
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
            <Button
                type="button"
                onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e)
                }
            >
                Atualizar
            </Button>
        </FormStyled>
    );
};
