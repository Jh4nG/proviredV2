import React, { useState } from "react";
import Logo from '../../assets/images/logo_provired.webp';
import { FormLogin } from "./components/FormLogin";
import { StepsRecuperar } from "./components/StepsRecuperar";

export const Login = () => {

    const [statusLogin, setStatusLogin] = useState(false);

    const handleStatusLogin = () =>{
        setStatusLogin(!statusLogin);
    }

    return (
        <>
        <div className="p-5 bg-image login"></div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-3"></div>
                <div className="col-12 col-md-6">
                    <div className="login__card p-5 mx-1 mx-lg-5 mb-5 p-5 shadow-5">
                        <div className="login__logo text-center mb-4">
                            <img src={Logo} />
                        </div>
                        <div className="card-body text-center">
                            { statusLogin === false ? (
                                <>
                                    <FormLogin />
                                    <a className="login__olvide" onClick={handleStatusLogin}>Olvidé mi contraseña</a>
                                </>
                            ) : (
                                <>
                                    <StepsRecuperar 
                                        handleStatusLogin={handleStatusLogin}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3"></div>
            </div>
        </div>
        </>
    );
};
