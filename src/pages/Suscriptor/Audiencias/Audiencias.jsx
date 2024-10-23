import {
    Alert,
    Button,
    DatePicker,
    Form,
    Popconfirm,
    Space,
    Table,
    Tag,
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { obtenerAudiencias } from "../../../services/audiencias";
import { useFormik } from "formik";
import * as Yup from "yup";

export const AudienciasComponent = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const { user } = useSelector((state) => state.usuarioState);
    const [audiencias, setAudiencias] = useState(null);
    const [msgAudiencias, setMsgAudiencias] = useState("");
    const columns = [
        {
            title: "Detalle",
            dataIndex: "detalle",
            key: "detalle",
            headerColor: "#6D84A3",
            render: (_, record) =>
                audiencias.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() =>
                            handleViewDetail(record.id_vencimiento)
                        }
                    >
                        <a>Ver detalle</a>
                    </Popconfirm>
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

    const handleViewDetail = (key) => {
        console.log(key);
    };

    return (
        <div className="col-12 justify-content">
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
                    <button type="submit" className="btn btn-primary">
                        Consultar
                    </button>
                </div>
            </form>

            <div className="row mt-5">
                {audiencias &&
                    (audiencias?.length > 0 ? (
                        <>
                            <Table
                                className="h-100 d-inline-block"
                                headerColor="#6D84A3"
                                columns={columns}
                                dataSource={audiencias}
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
