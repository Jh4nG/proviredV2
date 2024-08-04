import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/login/Login';
import { InRoutes } from './InRoutes';

export const AppRouter = ()=>{
    
    const status = false;
    return (
        status === false ? (
            <>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </>
        ) : (
            <InRoutes />
        )
    )
}