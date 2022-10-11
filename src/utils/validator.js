export function validateRegisterForm(datos){
    if (datos.nombre==="" || datos.apellido==="" || datos.correo==="" || datos.passwd === "") {
        return false;
    }
    return true
}



export function validateConfirmationForm(datos){
    if (datos.correo === "" || datos.codigo==="" ) {
        return false
    }
}