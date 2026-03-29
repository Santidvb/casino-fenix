//Funciones generales para accesos edits etc
import { supabase } from "./auth.js";

//Leer Datos

export async function perfil() {
	const { data: { session } } = await supabase.auth.getSession();
	const user = session?.user;
	
	if (!user) return null;
	
	const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
	
	if (error) {
		console.error("Error al obtener perfil:", error.message);
		return null;
	}
	return data;
}
 //uso para mostrar: 
 //const perfil = await perfil();
 //if(perfil) {
 //		document.getElementById("balance").innerText = `Dinero: $${perfil.dinero_actual}`;
 //}
 //
 //Ahi hacemos que se cambie el texto del dinero que tiene actualizandose segun su balance actual



 //actualizar datos

export async function actualizar(nuevosDatos) {
	const { data: { user } } = await supabase.auth.getUser();
	
	const { data, error } = await supabase.from("profiles").update(nuevosDatos).eq("id", user.id);
	
	if (error) {
		console.error("Error al actualizar:", error.message);
		return false;
	}
	return true;
}

//Ejemplo:
//async function ganarDinero(cantidad) {
//		const perfil = await perfil();
//		const nuevoTotal = perfil.dinero_actual + cantidad;
//		let cambios = { dinero_actual: nuevoTotal };
//		if (nuevoTotal > perfil.mayor_historico) {
//		cambios.mayor_historico = nuevoTotal;
//		}
//	await actualizar(cambios);
//}
//
//ahi se cambia valor


//ver sesion
export async function verificar() {
	const { data: { session } } = await supabase.auth.getSession();
	return session ? session.user : null;
}

//cambio perfil

export async function subirFoto(archivo) {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    
    if (!user) {
        console.log("No hay usuario logueado en la sesión.");
        return null;
    }

    console.log("Tu ID de usuario es:", user.id);

    const nombreArchivo = `${user.id}/avatar.png`;
    console.log("Intentando subir a la ruta:", nombreArchivo);

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatares')
        .upload(nombreArchivo, archivo, {
            upsert: true 
        });

    if (uploadError) {
        console.error("Error de Supabase:", uploadError.message);
        return null;
    }

    const { data: { publicUrl } } = supabase.storage
        .from('avatares')
        .getPublicUrl(nombreArchivo);

    const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

    if (updateError) {
        console.error("Error al guardar URL en el perfil:", updateError.message);
        return null;
    }

    return publicUrl;
}



export function toggleHide(e) {
    e.classList.toggle("h");
}