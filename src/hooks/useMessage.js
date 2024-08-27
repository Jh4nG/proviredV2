import Swal from "sweetalert2"


export const messageAlertGeneric = (resp) => {
    let title = "Éxito";
    let icon = "success";
    switch(resp.status){
        case 400 : 
        case 404 : 
            title = "Advertencia";
            icon = "warning";
        break;
        case 500 : 
        case 501 : 
        case 503 : 
            title = "Error";
            icon = "error"
        break;
    }
    Swal.fire({
        title: title,
        icon : icon,
        text : resp.msg,
        confirmButtonText: "Continuar",
    });
}

export const messegeAlert = (title, msg, icon) => {
    Swal.fire({
        title: title,
        icon : icon,
        text : msg,
        confirmButtonText: "Continuar",
    });
}