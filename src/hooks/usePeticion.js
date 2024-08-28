import { apiUrl,hash } from "../../public/config";

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

export const postPeticionAuth = async (data) => {
    try{
        const resp = await fetch(`${apiUrl}/index`, {
            method : 'POST',
            headers : {
                'Accept' : '*/*',
                "Content-Type": "application/json",
                "Authorization": `Bearer ${hash}`
            },
            body : JSON.stringify(data)
        });
        const json = await resp.json();
        return json;
    }catch(err){
        return {status:500, msg : `Hubo un error: ${err}`};
    }
}