import { Navigate, Route, Routes } from "react-router-dom"
import { Home } from "../pages/home/Home"
import { useSelector } from "react-redux";
import { traverseMenu, traverseRouter } from "../hooks/useMenu";
import { useEffect } from "react";
import { Inicio } from "../pages/home/Inicio";
import { UnorderedListOutlined, AlertOutlined, StockOutlined, DiffOutlined, MailOutlined } from "@ant-design/icons";

export const InRoutesA = ({timeLogOut})=> {
    const userInfo = useSelector(state => state.usuarioState);
    const [menuItems, setMenuItems] = useState([]);
    const defaultKeyMenu = "/inicio";
    const items = [ 
        {
            key: "usuarios",
            label: "USUARIOS",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/usuarios-administradores",
                    label: "Administradores",
                    activo: 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/usuarios-operativos",
                    label: "Operativos",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/usuarios-suscriptores",
                    label: "Suscriptores",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
            ]
        },
        {
            key: "catalogos",
            label: "CATALOGOS",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/catalogo-departamentos",
                    label: "Departamentos",
                    activo: 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/catalogo-municipios",
                    label: "Municipios",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/catalogo-corporacion",
                    label: "Corporación",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/catalogo-despachos",
                    label: "despachos",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
            ]
        },
        {
            key: "consultas",
            label: "CONSULTAS",
            icon: <AlertOutlined />,
            children: [
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
                    key: "/valida-radicados",
                    label: "Validar Radicados",
                    active : userInfo.data.validar_radicados,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/digitar-notificaciones",
                    label: "Digitar Notificaciones",
                    active : userInfo.data.digitar_notificaciones,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/unificada",
                    label: "Unificada",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/editar-notificaciones",
                    label: "Editar Notificaciones",
                    active : userInfo.data.editar_notificaciones,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/estado-electronico",
                    label: "Estado Electrónico",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
            ]
        },
        {
            key: "autos",
            label: "AUTOS",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/reporte-diario",
                    label: "Reporte Diario",
                    activo: userInfo.data.reporte_diario,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/reporte-diario-autos",
                    label: "Reporte Diario / Autos",
                    active : userInfo.data.reporte_diario_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/cargar-autos",
                    label: "Cargar Autos / Enviar alertas",
                    active : userInfo.data.cargar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/gestionar-autos",
                    label: "Gestionar Autos",
                    active : userInfo.data.gestionar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/sincronizar-autos",
                    label: "Sincronizar Autos",
                    active : userInfo.data.sincronizar_autos,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
            ]
        },
        {
            key: "procesos",
            label: "PROCESOS",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/gestionar-solicitudes",
                    label: "Gestionar solicitudes",
                    activo: userInfo.data.solicitud_vigilancia,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/crear-solitud",
                    label: "Crear solicitud",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/informe-repetidos",
                    label: "Informe repetidos",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/gestionar-activos",
                    label: "Gestionar activos eliminados",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                },
                {
                    key: "/gestionar-informe",
                    label: "Gestionar Informe Procesal",
                    active : 1,
                    // route : <Route key="reporte-notificaciones-abogado" path="reporte-notificaciones-abogado" element={<ReporteAbogadoComponent />}/>
                }
            ]
        },
    ];
    const menu = {
        juzgados_activos: userInfo.data.juzgados_activos,
        consulta_manual: userInfo.data.consulta_manual,
        asigna_revision: userInfo.data.asigna_revision
    }

    useEffect(()=>{
        setMenuItems(traverseMenu(items));
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