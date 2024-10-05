import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";
import { UnorderedListOutlined, AlertOutlined, StockOutlined, DiffOutlined, MailOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { traverseMenu } from "../hooks/useMenu";
import { AudienciasComponent } from "../pages/Sucriptor/Audiencias/Audiencias";
import { ReporteNotificacionesComponent } from "../pages/Sucriptor/Notificaciones/ReporteNotificaciones/ReporteNotificaciones";
import { ReporteAbogadoComponent } from "../pages/Sucriptor/Notificaciones/ReporteAbogado/ReporteAbogado";

export const InRoutesS = ({timeLogOut})=> {
    const userInfo = useSelector(state => state.usuarioState);
    const [menuItems, setMenuItems] = useState([]);
    const items = [ 
        {
          key: "/mis-audiencias",
          icon: <UnorderedListOutlined />,
          label: "MIS AUDIENCIAS Y VENCIMIENTOS",
          active: 1
        },
        {
            key: "notificaciones",
            label: "NOTIFICACIONES",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/reporte-notificaciones",
                    label: "Reporte Notificaciones",
                    // active : (userInfo.data.misprocesos == '1') ? userInfo.data.misprocesos : userInfo.data.misprocesosauto,
                    active : 1,
                },
                {
                    key: "/reporte-notificaciones-abogado",
                    label: "Reporte por abogado",
                    active : (userInfo.data.group_users != userInfo.data.parent) ? 1 : 0,
                },
            ]
        },
        {
            key: "reportes",
            label: "REPORTES",
            icon: <StockOutlined />,
            children: [
                {
                    key: "/listado-general",
                    label: "Listado Procesos General",
                    active : 1
                },
                {
                    key: "/listado-activos",
                    label: "Listado Procesos Activos",
                    active : 1
                },
                {
                    key: "/eliminacion-masiva",
                    label: "Eliminación Masiva de Procesos",
                    active : 1
                },
                {
                    key: "/historial-procesos",
                    label: "Historial de Procesos",
                    active : userInfo.data.historialprocesos
                },
                {
                    key: "/mis-solicitudes",
                    label: "Mis Solicitudes",
                    active : 1
                },
                {
                    key: "/impulso-procesal",
                    label: "Consulta Impulso Procesal",
                    active : 1
                }
            ]
        },
        {
            key: "procesos",
            label: "PROCESOS",
            icon: <DiffOutlined />,
            children: [
                {
                    key: "/incluir",
                    label: "Incluir Nuevo",
                    active : 1
                },
            ]
        },
        {
            key: "/email-despachos",
            label: "EMAIL DESPACHOS",
            icon: <MailOutlined />,
            active: 1
        }
    ];
    const menu = {
        infodespachos: userInfo.data.infodespachos,
        avisosderemate: userInfo.data.avisosderemate,
        misprocesosalerta: userInfo.data.misprocesosalerta,
        misprocesospremium: userInfo.data.misprocesospremium,
        informe_procesal: userInfo.data.informe_procesal,
    }

    useEffect(()=>{
        setMenuItems(traverseMenu(items));
    }, [])
    return (
        <>
            <Routes>
                <Route path="/*" element={<Navigate to="/" />} />
                <Route path="/" element={<Home timeLogOut={timeLogOut} menu={menuItems}/>}>
                    {items.find(e => e.key == '/mis-audiencias').active && (
                        <Route path="mis-audiencias" element={<AudienciasComponent />}/>
                    )}
                    {items[1].children.find(e => e.key == '/reporte-notificaciones').active && (
                        <Route path="reporte-notificaciones" element={<ReporteNotificacionesComponent />}/>
                    )}
                    {items[1].children.find(e => e.key == '/reporte-notificaciones-abogado').active && (
                        <Route path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                    )}
                </Route>
            </Routes>
        </>
    )
}