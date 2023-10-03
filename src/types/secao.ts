export interface Section {
    id: number;
    descricao: string;
    codigo: string;
    codigoMatrizFilial: string;
    codigoERP: string | null;
    tipoSecao: {
        id: number;
        abreviacao: string;
        descricao: string;
    };
}

export interface SectionData {
    descricao: string;
    codigo: string;
    codigoMatrizFilial: string;
    codigoERP: string | null;
    tipoSecao: {
        abreviacao: string;
        descricao: string;
    };
}
