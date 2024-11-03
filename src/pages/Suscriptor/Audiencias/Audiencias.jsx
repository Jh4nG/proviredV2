import React from "react";
import { Alert, Table } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    eliminarAudiencia,
    exportarAudiencia,
    obtenerAudiencias,
} from "../../../services/audiencias";
import { IconDelete, IconEdit } from "../../../components/Icons";
import { NotificationComponent } from "../../../components/Notification/Notification";
import { EditAudiencia } from "./Components/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader } from "../../../components/Loader/Loader";
import { convetirFecha, downloadFile, getDate } from "../../../helpers/form";
import { messageAlertGeneric } from "../../../hooks/useMessage";

export const AudienciasComponent = () => {
    const { user, data } = useSelector((state) => state.usuarioState);
    const [showLoader, setShowLoader] = useState(false);
    const [audiencias, setAudiencias] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [msgAudiencias, setMsgAudiencias] = useState("");
    const [dataEdit, setDataEdit] = useState();
    const [notification, setNotification] = useState({
        type: "",
        placement: "",
        text: "",
    });

    const columns = [
        {
            title: "Acciones",
            dataIndex: "eliminar",
            key: "eliminar",
            headerColor: "#6D84A3",
            fixed: "left",
            align: "center",
            render: (_, record) =>
                audiencias.length >= 1 ? (
                    <>
                        <IconDelete
                            data={record.id_vencimiento}
                            handleAction={handleDelete}
                        />
                        <IconEdit
                            data={record.id_vencimiento}
                            handleAction={handleEdit}
                        />
                    </>
                ) : null,
        },
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
            width: 150,
        },
        {
            title: "Radicacion",
            dataIndex: "radicacion",
            key: "radicacion",
        },
        {
            title: "Proceso",
            dataIndex: "proceso",
            key: "proceso",
            width: 150,
        },
        {
            title: "Demandante",
            dataIndex: "demandante",
            key: "demandante",
            width: 200,
        },
        {
            title: "Demandado",
            dataIndex: "demandado",
            key: "demandado",
            width: 200,
        },
        {
            title: "Descripción de vencimiento",
            dataIndex: "descripcion_vence_terminos",
            key: "descripcion_vence_terminos",
        },
        {
            title: "Fecha",
            dataIndex: "fecha_vence_terminos",
            key: "fecha_vence_terminos",
            width: "8%",
            render: (_, record) =>
                audiencias.length >= 1
                    ? convetirFecha(record.fecha_vence_terminos)
                    : null,
        },
    ];
    const objectForm = {
        username: user,
        fi: `${getDate()}`,
        ff: `${getDate()}`,
    };

    const validateForm = Yup.object().shape({
        fi: Yup.string().required("Fecha desde es requerido"),
        ff: Yup.string().required("Fecha hasta es requerido"),
    });

    const form = useFormik({
        initialValues: objectForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            try {
                setShowLoader(true);
                const resp = await obtenerAudiencias(values);
                if (resp.status == 200) {
                    setAudiencias(resp.data);
                    setMsgAudiencias(resp?.msg);
                }
                setShowLoader(false);
            } catch (error) {}
        },
    });

    const handleDelete = async (key) => {
        try {
            const data = {
                username: user,
                id_vencimiento: key,
            };
            const resp = await eliminarAudiencia(data);
            if (resp.status == 200) {
                form.handleSubmit();
                setNotification({
                    type: "success",
                    placement: "bottomRight",
                    text: resp.msg,
                });
            } else if (resp.status == 400) {
                setNotification({
                    type: "error",
                    placement: "bottomRight",
                    text: resp.msg,
                });
            }
        } catch (error) {}
    };

    const handleEdit = (id) => {
        setDataEdit(audiencias.find((e) => e.id_vencimiento == id));
        setShowEdit(true);
    };

    const handleExportFile = async () => {
        const dataSend = {
            username: user,
            fi: form.values.fi,
            ff: form.values.ff,
            name_user: data.nombre,
            name_file: "Reporte_Audiencias",
        };
        setShowLoader(true);
        const resp = await exportarAudiencia(dataSend);
        if (resp.status == 200) {
            downloadFile(resp.nameFile, resp.url);
        } else {
            messageAlertGeneric(resp);
        }
        setShowLoader(false);
    };

    return (
        <div className="col-12 justify-content">
            {showLoader && <Loader show={showLoader} />}
            {showEdit && (
                <EditAudiencia
                    user={user}
                    data={dataEdit}
                    show={showEdit}
                    setShow={setShowEdit}
                    refresh={form.handleSubmit}
                />
            )}
            <NotificationComponent resp={notification} />
            <form className="row" onSubmit={form.handleSubmit}>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Desde:</label>
                    <input
                        id="fi"
                        name="fi"
                        type="date"
                        className="form-control"
                        value={form.values.fi}
                        onChange={form.handleChange}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Hasta:</label>
                    <input
                        id="ff"
                        name="ff"
                        type="date"
                        className="form-control"
                        value={form.values.ff}
                        onChange={form.handleChange}
                        required
                    />
                </div>
                <div className="col-12 text-end form-group mt-3">
                    <button type="submit" className="btn btn__primary">
                        Consultar
                    </button>
                </div>
            </form>

            <div className="row mt-5">
                {audiencias &&
                    (audiencias?.length > 0 ? (
                        <>
                            <div className="row">
                                <p className="col-12 col-md-10">
                                    Total Registros Consultados:{" "}
                                    {audiencias.length}
                                </p>
                                <button
                                    className="btn btn__excel col-12 col-md-2 mb-2"
                                    onClick={handleExportFile}
                                >
                                    <FileExcelOutlined /> Exportar excel
                                </button>
                            </div>
                            <Table
                                className="h-100 d-inline-block"
                                headerColor="#6D84A3"
                                columns={columns}
                                dataSource={audiencias}
                                size="small"
                                pagination={{
                                    current: 1,
                                    pageSize: 20,
                                }}
                                bordered
                            />
                        </>
                    ) : (
                        <Alert
                            description={msgAudiencias}
                            type="warning"
                            showIcon
                        />
                    ))}
            </div>
        </div>
    );
};
