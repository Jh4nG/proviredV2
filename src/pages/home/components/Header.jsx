import React from 'react';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import { useSelector } from 'react-redux';

export const HeaderComponent = () => {
    const userInfo = useSelector(state => state.usuarioState);
    const items = [
        {
          label: 'Modificar contraseña',
          key: '1',
          icon: <EditOutlined />,
        },
        {
          label: 'Cerrar sesión',
          key: '2',
          icon: <LogoutOutlined />,
          danger: true,
        }
    ];
    
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <div className="contain_header">
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                {userInfo.nombre}
            </Dropdown.Button>
        </div>
    )
}