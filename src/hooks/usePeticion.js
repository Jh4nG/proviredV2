
import { apiUrl,hash } from "../../public/config";
import { logout } from "../store/auth/authSlice";
import { store } from "../store/store";
import { messegeAlert } from "./useMessage";

export function getToken(){
    return store.getState().usuarioState.token;
}

export const getPeticion = async (url) => {
    try{
        const resp = await fetch(`${apiUrl}/${url}`, {
            mode : 'cors',
            method : 'GET',
            headers : {
                'Accept' : '*/*'
            }
        });
        const json = await resp.json();
        return json;
    }catch(err){
        return {status:500, msg : `Hubo un error: ${err}`};
    }
}

export const postPeticion = async (url, data) => {
    try{
        const resp = await fetch(`${apiUrl}/${url}`, {
            mode : 'cors',
            method : 'POST',
            headers : {
                'Accept' : '*/*',
            },
            body : JSON.stringify(data)
        });
        const json = await resp.json();
        return json;
    }catch(err){
        return {status:500, msg : `Hubo un error: ${err}`};
    }
}

export const getPeticionAuth = async (url) => {
    try{
        const resp = await fetch(`${apiUrl}/${url}`, {
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            }
        });
        const json = await resp.json();
        return json;
    }catch(err){
        return {status:500, msg : `Hubo un error: ${err}`};
    }
}

export const postPeticionAuth = async (data) => {
    try{
        const resp = await fetch(`${apiUrl}/index`, {
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`
            },
            body : JSON.stringify(data)
        });
        const json = await resp.json();
        if(json.status == 503){
            messegeAlert('Información!','Se ha vencido el token de acceso, por favor ingrese nuevamente.','info');
            store.dispatch(await logout());
            return json;
        }
        return json;
    }catch(err){
        return {status:500, msg : `Hubo un error: ${err}`};
    }
}