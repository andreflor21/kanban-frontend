import React from 'react';
import { Popconfirm, PopconfirmProps } from 'antd';

interface ConfirmProps extends PopconfirmProps {
    children: React.ReactNode;
}

export const Confirm = ({ children, ...rest }: ConfirmProps) => (
    <Popconfirm {...rest}>{children}</Popconfirm>
);
