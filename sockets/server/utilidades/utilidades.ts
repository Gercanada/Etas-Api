export const crearMensaje = (nombre: String, mensaje: String) => {
    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    };
}
