import { Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { editarAudiencias } from "../../../../services/audiencias";
import { messageAlertGeneric } from "../../../../hooks/useMessage";
import { Loader } from "../../../../components/Loader/Loader";
import { useState } from "react";
export const EditAudiencia = ({ user, data, show, setShow, refresh }) => {
    const [showLoader, setShowLoader] = useState(false);
    const objectForm = {
        username: user,
        fecha_vence_terminos: data.fecha_vence_terminos,
        descripcion_vence_terminos: data.descripcion_vence_terminos,
        id_vencimiento: data.id_vencimiento,
    };

    const validateForm = Yup.object().shape({
        fecha_vence_terminos: Yup.string().required(
            "Fecha Audiencia / Vencimiento desde es requerido"
        ),
        descripcion_vence_terminos: Yup.string().required(
            "Detalle Audiencia Vencimiento es requerido"
        ),
    });

    const form = useFormik({
        initialValues: objectForm,
        validationSchema: validateForm,
        onSubmit: async (values) => {
            try {
                const resp = await editarAudiencias(values);
                setShowLoader(true);
                messageAlertGeneric(resp);
                setShow(false);
                setShowLoader(false);
                refresh();
            } catch (error) {}
        },
    });

    return (
        <Modal
            title="Editar Audiencia"
            centered
            open={show}
            footer={<></>}
            width={1000}
            maskClosable={false}
        >
            {showLoader && <Loader show={showLoader} />}
            <form className="row" onSubmit={form.handleSubmit}>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Ciudad:</label>
                    <p>{data.nameCiudad}</p>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Ciudad:</label>
                    <p>{data.nameDespacho}</p>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Radicación:</label>
                    <p>{data.radicacion}</p>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Proceso:</label>
                    <p>{data.proceso}</p>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Demandante:</label>
                    <p>{data.demandante}</p>
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">Demandado:</label>
                    <p>{data.demandado}</p>
                </div>
                <div className="col-12 col-md-6 form-group d-none">
                    <label className="fw-bold">id</label>
                    <textarea
                        id="id_vencimiento"
                        name="id_vencimiento"
                        className="form-control"
                        value={form.values.id_vencimiento}
                        onChange={form.handleChange}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">
                        Detalle Audiencia Vencimiento
                    </label>
                    <textarea
                        id="descripcion_vence_terminos"
                        name="descripcion_vence_terminos"
                        className="form-control"
                        value={form.values.descripcion_vence_terminos}
                        onChange={form.handleChange}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 form-group">
                    <label className="fw-bold">
                        Fecha Audiencia / Vencimiento:
                    </label>
                    <input
                        id="fecha_vence_terminos"
                        name="fecha_vence_terminos"
                        type="date"
                        className="form-control"
                        value={form.values.fecha_vence_terminos}
                        onChange={form.handleChange}
                        required
                    />
                </div>
                <div className="col-12 text-end form-group mt-3">
                    <button
                        type="submit"
                        className="btn btn__secondary mx-3"
                        onClick={() => {
                            setShow(false);
                        }}
                    >
                        Cerrar
                    </button>
                    <button type="submit" className="btn btn__primary">
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
};
