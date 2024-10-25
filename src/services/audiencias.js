import { postPeticionAuth } from "../hooks/usePeticion";

export const obtenerVencimientos = async (user) => {
    try{
        const data = {
            "controller" : "Audiencias",
            "method" : "getVencimientos",
            "params" : {
                user
            }
        }
        return await postPeticionAuth(data);
    }catch(err){
        return err;
    }
}

export const obtenerAudiencias = async (dataSend) => {
    try{
        const data = {
            "controller" : "Audiencias",
            "method" : "getAudiencias",
            "params" : dataSend
        }
        return await postPeticionAuth(data);
    }catch(err){
        return err;
    }
}

export const eliminarAudiencia = async (dataSend) => {
    try{
        const data = {
            "controller" : "Audiencias",
            "method" : "deleteAudiencias",
            "params" : dataSend
        }
        return await postPeticionAuth(data);
    }catch(err){
        return err;
    }
}