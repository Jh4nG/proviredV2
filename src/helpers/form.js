const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

export const convetirFecha = (fecha) => {
	var fecha = fecha.split('-').reverse();
	fecha[1] = meses[Number(fecha[1]-1)].substr(0,3);
	return fecha.join('-');
}

export const getDate = () => {
    const today = new Date();
	const month =
        today.getMonth() + 1 > 9
            ? today.getMonth() + 1
            : `0${today.getMonth() + 1}`;
    const year = today.getFullYear();
    const date = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;
	return `${year}-${month}-${date}`;
}

export const downloadFile = (nameFile, fileURL) => {
    var mediaType="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,";
    const downloadLink = document.createElement('a');
    downloadLink.href = mediaType+fileURL;
    downloadLink.download = nameFile;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(fileURL);
}