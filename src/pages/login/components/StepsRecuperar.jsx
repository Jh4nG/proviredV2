import Stepper from 'react-stepper-horizontal';
import { MDBInput } from 'mdb-react-ui-kit';
import { useRef, useState } from 'react';
import { useFormik } from 'formik';
import { actualizarPassword, validarToken, validarUsuario } from '../../../services/loginService.js';
import { messageAlertGeneric, messegeAlert } from '../../../hooks/useMessage';
import ReCAPTCHA from 'react-google-recaptcha'
import * as Yup from 'yup';
import { captcha_key } from '../../../../public/config.js';
import { Loader } from '../../../components/Loader/Loader.jsx';


export const StepsRecuperar = ({
    handleStatusLogin
})=>{
    const recaptcha = useRef();
    const [inputUser, setInputUser] = useState('');
    const inputReferenceUser = useRef(null);
    const [inputToken, setInputToken] = useState('');
    const inputReferenceToken = useRef(null);
    const [inputPassword, setInputPassword] = useState('');
    const inputReferencePasword = useRef(null);
    const [inputPasswordVerify, setInputPasswordVerify] = useState('');
    const inputReferencePaswordVerify = useRef(null);
    const [ activeStep, setActiveStep ] = useState(0);
    const [showLoader, setShowLoader] = useState(false);
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
    const handleSetInputPassword = (e)=>{
        setInputPassword(e.target.value);
        setTimeout(()=>{inputReferencePasword.current.focus();},10);
    }
    const handleSetInputPasswordVerify = (e)=>{
        setInputPasswordVerify(e.target.value);
        setTimeout(()=>{inputReferencePaswordVerify.current.focus();},10);
    }

    const validateUser = async (e)=>{
        e.preventDefault();
        setShowLoader(true);
        const resp = await validarUsuario(inputUser)
        if(resp.status == 200){
            setActiveStep(1);
        }else{
            messageAlertGeneric(resp);
        }
        setShowLoader(false);
    }

    const validateToken = async (e)=>{
        e.preventDefault();
        setShowLoader(true);
        const resp = await validarToken(inputUser, inputToken);
        if(resp.status == 200){
            setActiveStep(2);
        }else{
            messageAlertGeneric(resp);
        }
        setShowLoader(false);
    }
    
    const handleSubmit = async (e)=> {
        e.preventDefault();        
        setShowLoader(true);
        if(!recaptcha.current.getValue()){ // no se ha validado el captcha
            messegeAlert('Advertencia', 'No se ha validado el captcha, por favor verifique.', 'info');
            setShowLoader(false);
            return;
        }else{
            const objectRecuperar = {
                user: inputUser,
                newPassword: inputPassword,
                newPasswordConfirm: inputPasswordVerify,
                token: inputToken, // código enviado al correo
                captcha: recaptcha.current.getValue()
            }
            const resp = await actualizarPassword(objectRecuperar);
            if(resp.status == 200){
                messegeAlert('Éxito', resp.msg, 'success');
                handleStatusLogin();
            }else{
                messageAlertGeneric(resp);
            }
        }
        setShowLoader(false);
    }
    
    const ValidateEmail = ()=> {
        return (
            <form onSubmit={validateUser}>
                <MDBInput wrapperClass='mb-4' label='Usuario *' ref={inputReferenceUser} id='inputUser' name='inputUser' value={inputUser} onChange={handleSetInputUser} type='text' required/>
                <button className="w-75 mb-4 btn btn__primary">Validar</button>
            </form>
        )
    }
    const ConfirmToken = ()=> {
        return (
            <form onSubmit={validateToken}>
                <p className='text-success'>Correo enviado correctamente. Por favor valide su bandeja de entrada.</p>
                <MDBInput wrapperClass='mb-4' label='Token *' ref={inputReferenceToken} id='inputToken' name='inputToken' value={inputToken} onChange={handleSetInputToken} type='text' required/>
                <button className="w-75 mb-4 btn btn__primary">Validar</button>
            </form>
        )
    }
    const UpdatePassword = ()=> {
        return (
            <form onSubmit={handleSubmit}>
                <MDBInput wrapperClass='mb-4' label='Contraseña *' ref={inputReferencePasword} id='newPassword' name='newPassword' value={inputPassword} onChange={handleSetInputPassword} type='password' required/>
                <MDBInput wrapperClass='mb-4' label='Confirmar contraseña *' ref={inputReferencePaswordVerify} id='newPasswordConfirm' name='newPasswordConfirm' value={inputPasswordVerify} onChange={handleSetInputPasswordVerify} type='password' required/>
                <div className='d-flex justify-content-center mb-4'>
                    <ReCAPTCHA ref={recaptcha} sitekey={captcha_key}/>
                </div>
                <button className="w-75 mb-4 btn btn__primary" type='submit'>Confirmar</button>
            </form>
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
        <>
            {showLoader && (<Loader show={showLoader} />)}
            <Stepper
                steps={steps}
                activeStep={activeStep}
                defaultColor="gray"
                completeColor="green"
                activeColor="#2e58a6"
                />
            
            <div className='mt-5'>
                { getSectionComponent() }
            </div>

            <button className="w-75 mb-4 btn btn__cancel" onClick={handleStatusLogin}>Cancelar</button>
        </>
    )
}