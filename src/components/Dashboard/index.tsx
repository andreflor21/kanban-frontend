import React, { ReactNode } from 'react';
import Button from '../Button';
import { useAuth } from '../../providers/Auth';
import { useNavigate } from 'react-router-dom';
export const Dashboard = () => {
    const { userLogoff } = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <h1>Dashboard</h1>
            <Button type="button" onClickFunc={() => userLogoff(navigate)}>
                Sair
            </Button>
        </>
    );
};
