import { actualizar } from "../funcionesBase";
import { perfil } from "../funcionesBase";


//Comprar
export async function comprarItem(nombreItem, precio) {
	const perfil = await perfil();
	
	if (perfil.dinero_actual >= precio) {
		const nuevaColeccion = [...perfil.coleccion, nombreItem];
		
		const exito = await actualizar({ dinero_actual: perfil.dinero_actual - precio, coleccion: nuevaColeccion, dinero_gastado: perfil.dinero_gastado + precio, compras_hechas: perfil.compras_hechas + 1 });
		
		if (exito) alert("Se compró correctamente");
		} else {
			alert("No tienes dinero");
		}
}

//suma
export async function sumaBal(cantidad) {
    const perfil = await perfil();
    
    const exito = await actualizar({ dinero_actual: perfil.dinero_actual + cantidad});
    
    if (exito) {
        
    }
}