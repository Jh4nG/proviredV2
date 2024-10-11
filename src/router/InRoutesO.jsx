import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { traverseMenu, traverseRouter } from "../hooks/useMenu";
import { UnorderedListOutlined, AlertOutlined, StockOutlined, DiffOutlined, MailOutlined } from "@ant-design/icons";
import { Inicio } from "../pages/home/Inicio";

export const InRoutesO = ({timeLogOut})=> {
    const userInfo = useSelector(state => state.usuarioState);
    const [menuItems, setMenuItems] = useState([]);
    const defaultKeyMenu = "/inicio";
    const items = [ 
        {
            key: "consultas",
            label: "CONSULTAS",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/gestionar-autos",
                    label: "Gestionar Autos",
                    activo: userInfo.data.gestionar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/historial-procesos",
                    label: "Historial de procesos",
                    activo: userInfo.data.historial_de_procesos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                }
            ]
        },
        {
            key: "notificaciones",
            label: "NOTIFICACIONES",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/guia-captura",
                    label: "Guía de Captura",
                    activo: userInfo.data.guia_de_captura,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/digitar-notificaciones",
                    label: "Digitar Notificaciones",
                    active : userInfo.data.digitar_notificaciones,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/listados-activos",
                    label: "Listado Juzgados Activos",
                    active : userInfo.data.juzgados_activos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/consulta-manual",
                    label: "Consulta Manual",
                    active : userInfo.data.consulta_manual,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/valida-radicados",
                    label: "Validar Radicados",
                    active : userInfo.data.validar_radicados,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/reporte-diario-autos",
                    label: "Reporte Diario / Autos",
                    active : userInfo.data.reporte_diario_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                }
            ]
        },
        {
            key: "movimientos",
            label: "Movimientos",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/editar-notificaciones",
                    label: "Editar Notificaciones",
                    active : userInfo.data.editar_notificaciones,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/cargar-autos",
                    label: "Cargar Autos / Enviar alertas",
                    active : userInfo.data.cargar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/reporte-diario",
                    label: "Reporte Diario",
                    activo: userInfo.data.reporte_diario,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/sincronizar-autos",
                    label: "Sincronizar Autos",
                    active : userInfo.data.sincronizar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
            ]
        }
    ];
    const menu = {
        solicitud_vigilancia: userInfo.data.solicitud_vigilancia,
        asigna_revision: userInfo.data.asigna_revision
    }

    useEffect(()=>{
        setMenuItems(traverseMenu(items));
        console.log(items, traverseMenu(items));        
    }, [])
    
    return (
        <>
            <Routes>
                <Route path="/*" element={<Navigate to={defaultKeyMenu} />} />
                <Route path="/" element={<Home timeLogOut={timeLogOut} menu={menuItems} defaultKeyMenu={defaultKeyMenu} />}>
                    <Route path="inicio" element={<Inicio />} />
                    {traverseRouter(items)}
                </Route>
            </Routes>
        </>
    )
}