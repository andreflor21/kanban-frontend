import { ReactNode } from 'react';
// import { AuthProvider } from './Auth';
import { UserProvider } from './User';
import { PerfilProvider } from './Profile';

interface ProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
    return (
        // <AuthProvider>
        <UserProvider>
            <PerfilProvider>{children}</PerfilProvider>
        </UserProvider>
        // </AuthProvider>
    );
};

export default Providers;
