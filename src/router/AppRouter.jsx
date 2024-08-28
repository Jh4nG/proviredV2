import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/login/Login';
import { InRoutesS } from './InRoutesS';
import { useSelector } from 'react-redux';
import { InRoutesA } from './InRoutesA';
import { InRoutesO } from './InRoutesO';

export const AppRouter = ()=>{
    
    const { status,tipousuario } = useSelector(state => state.usuarioState);
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
                    <InRoutesS />
                )}
                {tipousuario === 'A' && (
                    <InRoutesA />
                )}
                {tipousuario === 'O' && (
                    <InRoutesO />
                )}
            </>
        )
    )
}