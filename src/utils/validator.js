export function validateRegisterForm(datos){
    //let ans = [true,""];
    if (datos.nombre==="" || datos.apellido==="" || datos.correo==="" || datos.passwd === "") {
        return [false,"Todos los campos deben contener información"];  
    }
    if (datos.passwd.length < 6) {
        return [false,"La contraseña debe ser al menos 6 caracteres"];  
    }
    if (!datos.correo.endsWith("@itam.mx")) {
        return [false,"Se debe utilizar el correo del ITAM"];  
    }
    return [true,""]
}


//Help
export function validateConfirmationForm(datos){
    if (datos.correo === "" || datos.codigo==="" ) {
        return false
    }
}