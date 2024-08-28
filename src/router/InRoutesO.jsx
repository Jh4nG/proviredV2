import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";


export const InRoutesO = ()=> {
    const userInfo = useSelector(state => state.usuarioState);
    return (
        <>
            {console.log(userInfo)}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/*" element={<Navigate to="/" />} />

            </Routes>
        </>
    )
}