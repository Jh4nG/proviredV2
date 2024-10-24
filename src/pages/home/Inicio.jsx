import { useSelector } from "react-redux";
import { obtenerVencimientos } from "../../services/audiencias";
import { Alert, Table } from "antd";
import { useEffect, useState } from "react";

export const Inicio = () => {
    const userInfo = useSelector((state) => state.usuarioState);
    const { user } = userInfo;
    const [audiencias, setAudiencias] = useState([]);
    const columns = [
        {
            title: "Ciudad",
            dataIndex: "nameCiudad",
            key: "nameCiudad",
            headerColor: "#6D84A3",
        },
        {
            title: "Despacho",
            dataIndex: "nameDespacho",
            key: "nameDespacho",
        },
        {
            title: "Fecha",
            dataIndex: "fecha_vence_terminos",
            key: "fecha_vence_terminos",
        },
    ];

    const getVencimientos = async () => {
        try {
            const resp = await obtenerVencimientos(user);
            if (resp.status == 200) {
                setAudiencias(resp.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (userInfo.tipousuario == "S") {
            getVencimientos();
        }
    }, []);
    return userInfo.tipousuario == "S" ? (
        <div className="justify-content">
            <h4 className="mb-4">Audiencias y/o Vencimientos Próximos</h4>
            {audiencias.length > 0 ? (
                <>
                    <Table
                        headerColor="#6D84A3"
                        columns={columns}
                        dataSource={audiencias}
                        bordered
                    />
                    <button className="btn btn__primary">Ver más</button>
                </>
            ) : (
                <>
                    <Alert
                        description="No tiene audiencias y/o vencimientos programados."
                        type="warning"
                        showIcon
                    />
                    <br />
                    <Alert
                        description="Ahora usted puede programar las fechas de audiencias y/o vencimientos de términos en la plataforma de Provired, dando click en el boton  (PROGRAMAR) que aparece en el REPORTE DE NOTIFICACIONES y en el LISTADO DE PROCESOS ACTIVOS."
                        type="info"
                        showIcon
                    />
                </>
            )}
        </div>
    ) : (
        <>Inicio para suscriptor y administrador</>
    );
};
