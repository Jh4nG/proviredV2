import Stepper from 'react-stepper-horizontal';
import { MDBInput } from 'mdb-react-ui-kit';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


export const StepsRecuperar = ({
    handleStatusLogin
})=>{
    const [inputUser, setInputUser] = useState('');
    const inputReferenceUser = useRef(null);
    const [inputToken, setInputToken] = useState('');
    const inputReferenceToken = useRef(null);
    const [ activeStep, setActiveStep ] = useState(0);
    const steps = [
        { title: 'Validar Correo' },
        { title: 'Confirmar Token' },
        { title: 'Actualizar contraseña' },
    ];

    const objectRecuperar = {
        user: inputUser,
        newPassword: '',
        newPasswordConfirm: '',
        token: inputToken, // código enviado al correo
        captcha: ''
    }

    const validateFormRecupera = Yup.object().shape({
        user: Yup.string().required("Usuario es requerido"),
        newPassword: Yup.string().required("Nueva contraseña es requerido"),
        newPasswordConfirm: Yup.string().required("confirmación de nueva contraseña es requerido"),
        token: Yup.string().required("token es requerido"),
        captcha: Yup.string().required("Capcha es requerido")
    });

    const formRecupera = useFormik({
        initialValues: objectRecuperar,
        validationSchema: validateFormRecupera,
        onSubmit: async (values) => {
            // logica
            console.log('pasa form');
        }
    });

    const handleSetInputUser = (e)=>{
        setInputUser(e.target.value);
        setTimeout(()=>{inputReferenceUser.current.focus();},10);
    }
    const handleSetInputToken = (e)=>{
        setInputToken(e.target.value);
        setTimeout(()=>{inputReferenceToken.current.focus();},10);
    }

    const validateUser = (e)=>{
        e.preventDefault();
        console.log('valida usuario');
        setActiveStep(1)
    }

    const validateToken = (e)=>{
        e.preventDefault();
        console.log('valida token');
        setActiveStep(2)
    }
    
    const ValidateEmail = ()=> {
        return (
            <form onSubmit={validateUser}>
                <MDBInput wrapperClass='mb-4' label='Usuario *' ref={inputReferenceUser} id='inputUser' name='inputUser' value={inputUser} onChange={handleSetInputUser} type='text' required/>
                <button className="w-100 mb-4 form-control btn__primary">Validar</button>
            </form>
        )
    }
    const ConfirmToken = ()=> {
        return (
            <form onSubmit={validateToken}>
                <MDBInput wrapperClass='mb-4' label='Token *' ref={inputReferenceToken} id='inputToken' name='inputToken' value={inputToken} onChange={handleSetInputToken} type='text' required/>
                <button className="w-100 mb-4 form-control btn__primary">Validar</button>
            </form>
        )
    }
    const UpdatePassword = ()=> {
        return (
            <>

            </>
        )
    }

    const getSectionComponent = () => {
        switch(activeStep) {
          case 0: return <ValidateEmail/>;
          case 1: return <ConfirmToken/>;
          case 2: return <UpdatePassword/>;
          default: return null;
        }
      }

    return (
        <div>
            <Stepper
                steps={steps}
                activeStep={activeStep}
                defaultColor="gray"
                completeColor="green"
                activeColor="#2e58a6"/>
            
            <div className='mt-5'>
                { getSectionComponent() }
            </div>

            <button className="w-100 mb-4 form-control btn__cancel" onClick={handleStatusLogin}>Cancelar</button>
        </div>
    )
}