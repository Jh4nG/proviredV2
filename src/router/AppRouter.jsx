import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/login/Login';
import { InRoutesS } from './InRoutesS';
import { useDispatch, useSelector } from 'react-redux';
import { InRoutesA } from './InRoutesA';
import { InRoutesO } from './InRoutesO';
import { logout } from '../store/auth/authSlice';
import { messegeAlert } from '../hooks/useMessage';

export const AppRouter = ()=>{
    
    const { status,tipousuario } = useSelector(state => state.usuarioState);
    const dispatch = useDispatch();
    
    const timeLogOut = ()=> {
        dispatch(logout());
        messegeAlert('Información!','Se ha cerrado sesión por inactividad en la platafora','info');
    }

    return (
        status === 'logout' ? (
            <>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </>
        ) : (
            <>
                {tipousuario === 'S' && (
                    <InRoutesS 
                        timeLogOut={timeLogOut}
                    />
                )}
                {tipousuario === 'A' && (
                    <InRoutesA 
                        timeLogOut={timeLogOut}
                    />
                )}
                {tipousuario === 'O' && (
                    <InRoutesO 
                        timeLogOut={timeLogOut}
                    />
                )}
            </>
        )
    )
}