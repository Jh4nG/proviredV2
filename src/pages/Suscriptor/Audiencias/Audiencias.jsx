import React from "react";
import { Alert, Table } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
    eliminarAudiencia,
    obtenerAudiencias,
} from "../../../services/audiencias";
import { IconDelete, IconEdit } from "../../../components/Icons";
import { NotificationComponent } from "../../../components/Notification/Notification";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditAudiencia } from "./Components/Edit";

export const AudienciasComponent = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const { user } = useSelector((state) => state.usuarioState);
    const [audiencias, setAudiencias] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [msgAudiencias, setMsgAudiencias] = useState("");
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
        },
    ];
    const objectForm = {
        username: user,
        fi: `${year}-${month}-${date}`,
        ff: `${year}-${month}-${date}`,
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
                const resp = await obtenerAudiencias(values);
                if (resp.status == 200) {
                    setAudiencias(resp.data);
                    setMsgAudiencias(resp?.msg);
                }
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
        console.log(id);
        setShowEdit(true);
    };

    return (
        <div className="col-12 justify-content">
            <EditAudiencia show={showEdit} setShow={setShowEdit} />
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
                                <button className="btn btn__excel col-12 col-md-2 mb-2">
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
