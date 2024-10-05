import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";


export const InRoutesA = ({timeLogOut})=> {
    const userInfo = useSelector(state => state.usuarioState);
    const menu = {
        usuarios : {
            gestionar_administradores : 1,
            gestionar_operativos : 1,
            gestionar_suscriptores : 1,
        },
        catalogos : {
            gestionar_departamentos : 1,
            gestionar_municipios : 1,
            gestionar_corporaciones : 1,
            gestionar_despachos : 1,
        },
        consultas : {
            
        }
        
    }
    return (
        <>
            <Routes>
                <Route path="/" element={<Home timeLogOut={timeLogOut}/>} />
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}