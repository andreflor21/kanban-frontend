import { Usuario } from './usuario';
import { Rota } from './rota';

export interface Perfil {
    id?: number | string;
    descricao: string;
    usuarios?: Array<Usuario | Partial<Usuario>>[];
    rotas?: Array<Rota | Partial<Rota>>[];
}
