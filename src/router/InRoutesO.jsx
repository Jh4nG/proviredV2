import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";


export const InRoutesO = ({timeLogOut})=> {
    const userInfo = useSelector(state => state.usuarioState);
    const menu = {
        gestionar_autos: userInfo.data.gestionar_autos,
        validar_radicados: userInfo.data.validar_radicados,
        cargar_autos: userInfo.data.cargar_autos,
        historial_de_procesos: userInfo.data.historial_de_procesos,
        digitar_notificaciones: userInfo.data.digitar_notificaciones,
        solicitud_vigilancia: userInfo.data.solicitud_vigilancia,
        reporte_diario: userInfo.data.reporte_diario,
        guia_de_captura: userInfo.data.guia_de_captura,
        editar_notificaciones: userInfo.data.editar_notificaciones,
        sincronizar_autos: userInfo.data.sincronizar_autos,
        juzgados_activos: userInfo.data.juzgados_activos,
        consulta_manual: userInfo.data.consulta_manual,
        asigna_revision: userInfo.data.asigna_revision,
        reporte_diario_autos: userInfo.data.reporte_diario_autos,
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