import React, { useState } from 'react';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
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
import TitlePage from '../TitlePage';
import Title from '../Title';
import { Section } from '../../types/secao';
import { useSection } from '../../providers/Sections';
interface SectionFormProps {
    section?: Section | null;
    sectionId?: string;
    action: 'create' | 'duplicate' | 'edit';
    className?: string;
    title: string;
}
interface SectionData {
    descricao: string;
    codigo: string;
    codigoMatrizFilial: string;
    codigoERP: string | null;
    tipoSecaoId: number;
}
const SecitonForm = ({
    action,
    sectionId,
    className,
    title,
}: SectionFormProps) => {
    const { secaoId } = useParams();
    const navigate = useNavigate();
    const [section, setSection] = useState<string>('');
    const [descricaoError, setDescricaoError] = useState<boolean>(false);
    const [, setLoad] = useState(true);
    const { newSection, editSection, sections } = useSection();

    if (!sectionId) {
        sectionId = secaoId;
    }
    const s = sections.find((s) => s.id == parseInt(sectionId as string));
    const [descricao, setDescricao] = useState(s?.descricao);
    const [codigo, setCodigo] = useState(s?.codigo);
    const [codigoERP, setCodigoERP] = useState(s?.codigoERP);
    const [codigoMatrizFilial, setCodigoMatrizFilial] = useState(
        s?.codigoMatrizFilial
    );
    const [tipoSecaoId, setTipoSecaoId] = useState(s?.tipoSecao.id);

    const goBack = (path: string) => {
        navigate(path);
    };
    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const updateObject: SectionData = {
            descricao: descricao as string,
            codigo: codigo as string,
            codigoERP: codigoERP as string | null,
            codigoMatrizFilial: codigoMatrizFilial as string,
            tipoSecaoId: tipoSecaoId as number,
        };

        const schema = yup.object().shape({
            descricao: yup.string().required('Campo Obrigatório'),
            codigo: yup.string().required('Campo Obrigatório'),
            codigoERP: yup.string().required('Campo Obrigatório'),
            codigoMatrizFilial: yup.string().required('Campo Obrigatório'),
            tipoSecaoId: yup.number().required('Campo Obrigatório'),
        });

        await schema
            .validate({ ...updateObject })
            .then((v) => {
                if (action === 'create') {
                    newSection(v, setLoad, navigate);
                } else if (action === 'edit' && sectionId) {
                    editSection(v, parseInt(sectionId));
                }
            })
            .catch(() => {
                descricao === '' && setDescricaoError(true);
            });
    };
    return (
        <>
            <TitlePage title="Seções" />
            <Title>{title}</Title>
            <Container>
                <FormStyled className={className}>
                    <Input
                        label="Descrição"
                        inputType="text"
                        placeholder="Nome da seção"
                        errorMessage="Campo Obrigatório"
                        value={descricao}
                        error={descricaoError}
                        name="nome"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setDescricao(e.target.value);
                            setDescricaoError(false);
                        }}
                    />

                    <ContainerSelect>
                        <LabelStyled htmlFor="section">
                            Tipo de Seção
                        </LabelStyled>
                        <SelectStyled
                            id="section"
                            name="section"
                            value={section}
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => {
                                setSection(e.target.value);
                            }}
                        >
                            <OptionStyled value="">
                                Selecione o tipo
                            </OptionStyled>
                            {sections.map((p: Section) => (
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
                        Gravar
                    </Button>
                </FormStyled>
                <Button
                    type="button"
                    className="voltar"
                    onClickFunc={() => goBack('/secoes')}
                >
                    Voltar
                </Button>
            </Container>
        </>
    );
};

export default SecitonForm;
