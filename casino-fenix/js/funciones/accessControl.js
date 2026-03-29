import { perfil, actualizar, verificar } from "../funcionesBase.js";



export async function validarAccesoTexto(text) {
    await new Promise(res => setTimeout(res, 100));
            const usuario = await verificar();
            if(usuario) {
                console.log("Sesion detectada para:", usuario.email)
                const datos = await perfil();
                if(datos && datos.username) {
                    text.innerText = datos.username;
                } else {
                    text.innerText = usuario.email.split("@")[0];
                }
                document.body.classList.remove("h");
            } else {
                console.log("No hay usuario, esperando 1 segundo por las dudas");
                setTimeout(async () => {
                    const reintento = await verificar();
                    if(!reintento) window.location.href = "../index.html";
                    else location.reload();
                }, 1000);
            }
}







export async function validarAcceso() {
    await new Promise(res => setTimeout(res, 100));
            const usuario = await verificar();
            if(usuario) {
                console.log("Sesion detectada para:", usuario.email)
                const datos = await perfil();
                document.body.classList.remove("h");
            } else {
                console.log("No hay usuario, esperando 1 segundo por las dudas");
                setTimeout(async () => {
                    const reintento = await verificar();
                    if(!reintento) window.location.href = "../index.html";
                    else location.reload();
                }, 1000);
            }
}