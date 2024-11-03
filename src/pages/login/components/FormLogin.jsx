import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import { Loader } from "../../../components/Loader/Loader";
import { login } from "../../../services/loginService.js";
import { messageAlertGeneric } from "../../../hooks/useMessage";
import { ModalTerminos } from "./Terminos";
import { useNavigate } from "react-router-dom";
import { GetUserThunk } from "../../../store/auth/thunk.js";
import * as Yup from "yup";
import { setToken } from "../../../store/auth/authSlice.js";

export const FormLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLoader, setShowLoader] = useState(false);
    const [showTerminos, setShowTerminos] = useState(false);
    const [respuesta, setRespuesta] = useState();
    const objectLogin = {
        user: "",
        password: "",
    };

    const validateFormLogin = Yup.object().shape({
        user: Yup.string().required("Usuario es requerido"),
        password: Yup.string().required("Contraseña es requerido"),
    });

    const formLogin = useFormik({
        initialValues: objectLogin,
        validationSchema: validateFormLogin,
        onSubmit: async (values) => {
            setShowLoader(true);
            const resp = await login(values);
            if (resp.status == 200) {
                if (resp.redirect) {
                    // Se inicia sesión
                    if (resp.terminos_ok != undefined && !resp.terminos_ok) {
                        // Si no ha aceptado terminos, se muestra modal de terminos
                        setRespuesta(resp);
                        setShowTerminos(true);
                        setShowLoader(false);
                        return;
                    }
                    // Se hace lógica para persistencia de datos
                    redirectHome(resp.user, resp.tipousuario, resp.token);
                } else {
                    // Se verifica porque no inicia sesión
                    console.log("No pasa por redirect", resp);
                }
            } else {
                messageAlertGeneric(resp);
            }
            setShowLoader(false);
        },
    });

    const redirectHome = async (user, tipousuario, token) => {
        setShowTerminos(false);
        dispatch(setToken(token));
        dispatch(GetUserThunk(user, tipousuario))
            .then(async (resp) => {
                if (resp?.status == 200) {
                    navigate("/inicio");
                    setShowLoader(false);
                }
            })
            .finally(() => {
                setShowLoader(false);
            });
    };

    return (
        <>
            {showLoader && <Loader show={showLoader} />}
            <form onSubmit={formLogin.handleSubmit}>
                <h2 className="fw-bold mb-5">Inicio de sesión</h2>
                <MDBInput
                    wrapperClass="mb-4"
                    label="Usuario *"
                    id="user"
                    name="user"
                    onChange={formLogin.handleChange}
                    type="text"
                    required
                />

                <MDBInput
                    wrapperClass="mb-4"
                    label="Contraseña *"
                    id="password"
                    name="password"
                    onChange={formLogin.handleChange}
                    type="password"
                    required
                />
                <button className="w-100 mb-4 btn btn__primary">
                    Ingresar
                </button>
            </form>
            {showTerminos && (
                <ModalTerminos
                    show={showTerminos}
                    setModal={setShowTerminos}
                    parametro={respuesta}
                    redirectHome={redirectHome}
                />
            )}
        </>
    );
};
