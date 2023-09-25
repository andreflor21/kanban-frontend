import { Usuario } from './usuario';
import { Rota } from './rota';

export interface Perfil {
    id?: number | string;
    descricao: string;
    usuarios: Usuario[] | [];
    rotas: Rota[] | [];
}

export interface PerfilData {
    descricao: string;
}
