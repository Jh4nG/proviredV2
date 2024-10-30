import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { useSelector } from "react-redux";
import {
    UnorderedListOutlined,
    AlertOutlined,
    StockOutlined,
    DiffOutlined,
    MailOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { buscarPorKey, traverseMenu, traverseRouter } from "../hooks/useMenu";
import { AudienciasComponent } from "../pages/Suscriptor/Audiencias/Audiencias";
import { ReporteNotificacionesComponent } from "../pages/Suscriptor/Notificaciones/ReporteNotificaciones/ReporteNotificaciones";
import { ReporteAbogadoComponent } from "../pages/Suscriptor/Notificaciones/ReporteAbogado/ReporteAbogado";
import { Inicio } from "../pages/home/Inicio";

export const InRoutesS = ({ timeLogOut }) => {
    const userInfo = useSelector((state) => state.usuarioState);
    const navigate = useNavigate();
    const [menuItems, setMenuItems] = useState([]);
    const defaultKeyMenu =
        window.location.pathname == "/" || window.location.pathname == "/inicio"
            ? "/inicio"
            : window.location.pathname;
    const items = [
        {
            key: "/mis-audiencias",
            icon: <UnorderedListOutlined />,
            label: "MIS AUDIENCIAS Y VENCIMIENTOS",
            active: 1,
            route: (
                <Route
                    key="mis-audiencias"
                    path="mis-audiencias"
                    element={<AudienciasComponent />}
                />
            ),
        },
        {
            key: "notificaciones",
            label: "NOTIFICACIONES",
            icon: <AlertOutlined />,
            children: [
                {
                    key: "/reporte-notificaciones",
                    label: "Reporte Notificaciones",
                    active:
                        userInfo.data.misprocesos == "1"
                            ? userInfo.data.misprocesos
                            : userInfo.data.misprocesosauto,
                    // active : 1,
                    route: (
                        <Route
                            key="reporte-notificaciones"
                            path="reporte-notificaciones"
                            element={<ReporteNotificacionesComponent />}
                        />
                    ),
                },
                {
                    key: "/reporte-notificaciones-abogado",
                    label: "Reporte por abogado",
                    active:
                        userInfo.data.group_users != userInfo.data.parent
                            ? 1
                            : 0,
                    route: (
                        <Route
                            key="reporte-notificaciones-abogado"
                            path="reporte-notificaciones-abogado"
                            element={<ReporteAbogadoComponent />}
                        />
                    ),
                },
            ],
        },
        {
            key: "reportes",
            label: "REPORTES",
            icon: <StockOutlined />,
            children: [
                {
                    key: "/listado-general",
                    label: "Listado Procesos General",
                    active: 1,
                },
                {
                    key: "/listado-activos",
                    label: "Listado Procesos Activos",
                    active: 1,
                },
                {
                    key: "/eliminacion-masiva",
                    label: "Eliminación Masiva de Procesos",
                    active: 1,
                },
                {
                    key: "/historial-procesos",
                    label: "Historial de Procesos",
                    active: userInfo.data.historialprocesos,
                },
                {
                    key: "/mis-solicitudes",
                    label: "Mis Solicitudes",
                    active: 1,
                },
                {
                    key: "/impulso-procesal",
                    label: "Consulta Impulso Procesal",
                    active: 1,
                },
            ],
        },
        {
            key: "procesos",
            label: "PROCESOS",
            icon: <DiffOutlined />,
            children: [
                {
                    key: "/incluir",
                    label: "Incluir Nuevo",
                    active: 1,
                },
            ],
        },
        {
            key: "/email-despachos",
            label: "EMAIL DESPACHOS",
            icon: <MailOutlined />,
            active: 1,
        },
    ];
    const menu = {
        infodespachos: userInfo.data.infodespachos,
        avisosderemate: userInfo.data.avisosderemate,
        misprocesosalerta: userInfo.data.misprocesosalerta,
        misprocesospremium: userInfo.data.misprocesospremium,
        informe_procesal: userInfo.data.informe_procesal,
    };

    useEffect(() => {
        setMenuItems(traverseMenu(items));
        if (
            window.location.pathname == "/" ||
            buscarPorKey(traverseMenu(items), window.location.pathname) == null
        ) {
            navigate("/inicio");
        }
    }, []);
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            timeLogOut={timeLogOut}
                            menu={menuItems}
                            defaultKeyMenu={defaultKeyMenu}
                        />
                    }
                >
                    {traverseRouter(items)}
                    <Route path="inicio" element={<Inicio />} />
                    <Route
                        path="/*"
                        element={<Navigate to={defaultKeyMenu} />}
                    />
                </Route>
            </Routes>
        </>
    );
};
