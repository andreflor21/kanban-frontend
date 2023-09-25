import React, { Dispatch, useState } from 'react';
import * as yup from 'yup';
import { Perfil } from '../../types/perfil';

import { useNavigate } from 'react-router-dom';
import {
    FormStyled,
    Container,
    ContainerSelect,
    LabelStyled,
    SelectStyled,
    OptionStyled,
} from './styles';
import Input from '../Input';
import Button from '../Button';
import { useProfile } from '../../providers/Profile';
import TitlePage from '../TitlePage';
import Title from '../Title';
import Routes from '../Routes';
interface ProfileFormProps {
    profile?: Perfil | null;
    profileId?: string;
    action: 'create' | 'duplicate' | 'edit';
    className?: string;
    title: string;
}
interface PerfilData {
    descricao: string;
    perfil?: string;
}
const ProfileForm = ({
    action,
    profileId,
    className,
    title,
}: ProfileFormProps) => {
    const navigate = useNavigate();
    const [descricao, setDescricao] = useState<string>('');
    const [perfil, setPerfil] = useState<string>('');
    const [descricaoError, setDescricaoError] = useState<boolean>(false);
    const [load, setLoad] = useState(true);
    const { newProfile, editProfile, profiles } = useProfile();
    const goBack = (path: string) => {
        navigate(path);
    };
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const updateObject: PerfilData = {
            descricao,
        };

        const schema = yup.object().shape({
            descricao: yup.string().required('Campo Obrigatório'),
            perfil: yup.number(),
        });

        await schema
            .validate({ ...updateObject })
            .then((v) => {
                if (action === 'create') {
                    newProfile(v, setLoad, navigate);
                } else if (action === 'edit' && profileId) {
                    editProfile(v, parseInt(profileId));
                } else if (action === 'duplicate') {
                    console.log(action);
                }
            })
            .catch(() => {
                descricao === '' && setDescricaoError(true);
            });
    };
    return (
        <>
            <TitlePage title="Configurações" />
            <Title>{title}</Title>
            <Container>
                <FormStyled className={className}>
                    <Input
                        label="Descrição"
                        inputType="text"
                        placeholder="Nome do perfil"
                        errorMessage="Campo Obrigatório"
                        value={descricao}
                        error={descricaoError}
                        name="nome"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDescricao(e.target.value);
                            setDescricaoError(false);
                        }}
                    />
                    {action === 'duplicate' ? (
                        <ContainerSelect>
                            <LabelStyled htmlFor="perfil">
                                Perfil base
                            </LabelStyled>
                            <SelectStyled
                                id="perfil"
                                name="perfil"
                                value={perfil}
                                onChange={(
                                    e: React.ChangeEvent<HTMLSelectElement>
                                ) => {
                                    setPerfil(e.target.value);
                                }}
                            >
                                <OptionStyled value="">
                                    Selecione o perfil
                                </OptionStyled>
                                {profiles.map((p: Perfil) => (
                                    <OptionStyled key={p.id} value={p.id}>
                                        {p.descricao}
                                    </OptionStyled>
                                ))}
                            </SelectStyled>
                        </ContainerSelect>
                    ) : undefined}
                    <Button
                        type="button"
                        onClickFunc={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleSubmit(e)
                        }
                    >
                        Gravar
                    </Button>
                </FormStyled>
                <Routes profileId={profileId} />
                <Button
                    type="button"
                    onClickFunc={() => goBack('/configuracoes/perfil')}
                >
                    Voltar
                </Button>
            </Container>
        </>
    );
};

export default ProfileForm;
