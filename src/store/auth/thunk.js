import { messageAlertGeneric, messegeAlert } from "../../hooks/useMessage"
import { getUsuario } from "../../services/userService";
import { obtenerUsuario } from "./authSlice";

export const GetUserThunk = (user, tipousuario) => {
    return async( dispatch ) => {
        try{
            const resp = await getUsuario(user, tipousuario);
            if(resp.status == 200){
                await dispatch(obtenerUsuario(resp));
                return resp;
            }else{
                messageAlertGeneric(resp);
            }
        }catch(err){
            messegeAlert('Error',`Hubo un erro al obtener la información del usuario: ${err}`,'error');
        }
    }
}