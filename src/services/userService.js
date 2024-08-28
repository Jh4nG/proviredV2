import { postPeticion, postPeticionAuth } from "../hooks/usePeticion";

let dataSend = {
    controller : 'User',
    method : '',
    params : {}
}

export const getUsuario = async (user, tipousuario) => {
    try{
        const data = {user, tipousuario};
        dataSend = {...dataSend, method: 'getUser'};
        dataSend = {...dataSend, params: data};
        return await postPeticionAuth(dataSend);
    }catch(err){
        return err;
    }
}