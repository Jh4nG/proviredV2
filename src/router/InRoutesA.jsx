import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";


export const InRoutesA = ()=> {
    const userInfo = useSelector(state => state.usuarioState);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" />} />

            </Routes>
        </>
    )
}