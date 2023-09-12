export interface Usuario {
    nome: string;
    email: string;
    senha?: string;
    cpf: string;
    id?: number | string;
    dtNascimento?: string;
    codigo?: string;
    ativo?: boolean;
    trocaSenha?: boolean;
    tokenReset?: string;
    tokenResetExpire?: string;
    perfil: {
        id: number | string;
        descricao: string;
    };
}
export interface UsuarioData {
    nome?: string;
    email?: string;
    senha?: string;
    cpf?: string;
    id?: number | string;
    dtNascimento?: string;
    codigo?: string;
    ativo?: boolean;
    trocaSenha?: boolean;
    tokenReset?: string;
    tokenResetExpire?: string;
    perfil?: number | string;
}
