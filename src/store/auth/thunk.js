import { messageAlertGeneric, messegeAlert } from "../../hooks/useMessage"
import { getUsuario } from "../../services/userService";
import { obtenerUsuarioAdmin } from "./authSlice";

export const GetUserThunk = (user, tipousuario) => {
    return async( dispatch ) => {
        try{
            const resp = await getUsuario(user, tipousuario);
            if(resp.status == 200){
                switch(tipousuario){
                    case 'S':
                        await dispatch(obtenerUsuarioAdmin(resp));
                        break;
                    case 'A':
                        await dispatch(obtenerUsuarioAdmin(resp));
                        break;
                    case 'O':
                        await dispatch(obtenerUsuarioAdmin(resp));
                        break;
                }
                return resp;
            }else{
                messageAlertGeneric(resp);
            }
        }catch(err){
            messegeAlert('Error',`Hubo un erro al obtener la información del usuario: ${err}`,'error');
        }
    }
}