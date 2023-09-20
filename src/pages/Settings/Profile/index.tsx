import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePerfil } from '../../../providers/Perfil';
import TitlePage from '../../../components/TitlePage';
import Title from '../../../components/Title';

// import { Container } from './styles';

const Profile = () => {
    const { perfilId } = useParams();
    const { getPerfil, getPerfis, perfil, perfis } = usePerfil();

    useEffect(() => {
        if (perfilId) {
            getPerfil(parseInt(perfilId));
        } else {
            getPerfis();
        }
    }, [perfil, perfis]);

    return (
        <>
            <TitlePage title="Configurações" />
            <Title>Perfil</Title>
            {perfilId ? (
                <div>
                    <p>Descrição: {perfil.descricao}</p>
                </div>
            ) : (
                <div>
                    <ul>
                        {perfis.map((p) => (
                            <li key={p.id}>Descrição {p.descricao}</li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Profile;
