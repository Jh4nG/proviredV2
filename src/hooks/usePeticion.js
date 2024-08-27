import { apiUrl,hash } from "../../public/config";

export const getPeticion = async (url) => {
    const resp = await fetch(`${apiUrl}/${url}`, {
        mode : 'cors',
        method : 'GET',
        headers : {
            'Accept' : '*/*'
        }
    });
    const json = await resp.json();
    return json;
}

export const postPeticion = async (url, data) => {
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
}

// 'Authorization' : 'Bearer Token',
// 'X-Custom-Header' : `${hash}`