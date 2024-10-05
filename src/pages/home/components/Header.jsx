import React from 'react';
import { UserOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/auth/authSlice';

export const HeaderComponent = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.usuarioState);
    const items = [
        {
          label: 'Modificar contraseña',
          key: 'modifyUser',
          icon: <EditOutlined />,
        },
        {
          label: 'Cerrar sesión',
          key: 'logout',
          icon: <LogoutOutlined />,
          danger: true,
        }
    ];

    const handleCloseSession = ()=> {
        dispatch(logout());
    }
    
    const handleMenuClick = (e) => {
        switch(e.key){
            case 'logout' : handleCloseSession(); return;
            case 'modifyUser' : message.info('click modificar usuario'); return;
        }
    };
    
    const menuProps = {
        items : (userInfo.tipousuario == 'O') ? items.slice(1,2) : items,
        onClick: handleMenuClick,
    };
    return (
        <div className="contain_header">
            <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                {userInfo.data.nombre}
            </Dropdown.Button>
        </div>
    )
}