import { useFormik } from 'formik';
import { MDBInput } from 'mdb-react-ui-kit';
import * as Yup from 'yup';

export const FormLogin = ()=> {

    const objectLogin = {
        usuario: '',
        password: ''
    }

    const validateFormLogin = Yup.object().shape({
        usuario: Yup.string().required("Usuario es requerido"),
        password: Yup.string().required("Contraseña es requerido"),
    });

    const formLogin = useFormik({
        initialValues: objectLogin,
        validationSchema: validateFormLogin,
        onSubmit: async (values) => {
            // logica
            console.log('pasa form');
        }
    })
    
    return (
        <>
            <form onSubmit={formLogin.handleSubmit}>
                <h2 className="fw-bold mb-5">Inicio de sesión</h2>
                <MDBInput wrapperClass='mb-4' label='Usuario *' id='usuario' name='usuario' onChange={formLogin.handleChange} type='text' required/>

                <MDBInput wrapperClass='mb-4' label='Contraseña *' id='password' name='password' onChange={formLogin.handleChange} type='password' required/>
                <button className="w-100 mb-4 form-control btn__primary">Ingresar</button>
            </form>
        </>
    )
}