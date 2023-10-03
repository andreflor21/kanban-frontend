import { ReactNode } from 'react';
// import { AuthProvider } from './Auth';
import { UserProvider } from './User';
import { PerfilProvider } from './Profile';
import { SectionProvider } from './Sections';

interface ProviderProps {
    children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => {
    return (
        // <AuthProvider>
        <UserProvider>
            <PerfilProvider>
                <SectionProvider>{children}</SectionProvider>
            </PerfilProvider>
        </UserProvider>
        // </AuthProvider>
    );
};

export default Providers;
