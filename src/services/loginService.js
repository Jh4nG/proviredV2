import { getPeticion, postPeticion } from "../hooks/usePeticion";

export const login = async (data) => {
    try{
        return await postPeticion('login',data);
    }catch(err){
        return err;
    }
}

export const validarUsuario = async (user) => {
    try{
        return await getPeticion(`sendCambio/${user}`);
    }catch(err){
        return err;
    }
}

export const validarToken = async (user, token) => {
    try{
        return await getPeticion(`validarCodigo/${user}/${token}`);
    }catch(err){
        return err;
    }
}

export const actualizarPassword = async (data) => {
    try{
        return await postPeticion(`actualizaPassword`,data);
    }catch(err){
        return err;
    }
}