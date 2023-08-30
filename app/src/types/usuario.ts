export interface Usuario {
    nome: string;
    email: string;
    senha?: string;
    cpf: string;
    id?: number | string;
    dataNascimento?: Date;
    ativo?: boolean;
    tokenReset?: string;
    tokenResetExpire?: Date;
    perfil: {
        id: number | string;
        descricao: string;
    };
}
