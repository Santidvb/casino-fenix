import { validarAcceso } from "../funciones/accessControl.js";

window.addEventListener("DOMContentLoaded", () => {
    validarAcceso();
});





const btn1 = document.getElementById("menuBtn1");
const btn2 = document.getElementById("menuBtn2");
const btn3 = document.getElementById("menuBtn3");
const btn4 = document.getElementById("menuBtn4");
const btn5 = document.getElementById("menuBtn5");
const btn6 = document.getElementById("menuBtn6");
const btn7 = document.getElementById("menuBtn7");
const btn8 = document.getElementById("menuBtn8");


btn1.addEventListener("click", () => {
    window.location.href = "perfil.html";
});
btn2.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});

btn3.addEventListener("click", () => {
    window.location.href = "tienda.html";
});

btn4.addEventListener("click", () => {
    window.location.href = "donar.html";
});

btn5.addEventListener("click", () => {
    window.location.href = "usuarios.html";
});

btn6.addEventListener("click", () => {
    window.location.href = "ajustes.html";
});

btn7.addEventListener("click", () => {
    window.location.href = "ayuda.html";
});

btn8.addEventListener("click", () => {
    window.location.href = "inicio.html";
});


import { supabase } from "../auth.js";

const selectUser = document.getElementById("selectUser");
const inputMonto = document.getElementById("montoDonacion");
const enviarDonacion = document.getElementById("enviarDonacion");



const userBalance = document.getElementById("dineroUser");
const userDonated = document.getElementById("donationUser");
const userDonacionesHechas = document.getElementById("userCantDonacionesHechas");

async function cargarUsuarios() {
	const { data: { session } } = await supabase.auth.getSession();
	const miId = session?.user?.id;
	
	const { data: usuarios, error } = await supabase.from("profiles").select("id, username").neq("id", miId);
	
	if(error) {
		console.error(error.message);
		return;
	}
	
	usuarios.forEach(usuario => {
		const option = document.createElement("option");
		option.value = usuario.id;
		option.innerText = usuario.username;
		selectUser.appendChild(option);
	});
}




async function procesarDonacion() {
	const receptorId = selectUser.value;
	const monto = parseInt(inputMonto.value);
	
	if (!receptorId) {
		alert("Por favor, selecciona un usuario.");
		return;
	}
	
	if (isNaN(monto) || monto <= 0) {
		alert("Por favor, ingresa un monto válido.");
		return;
	}
	
	if (monto % 5 !== 0) {
		alert("Solo puedes donar cantidades en múltiplos de 5.");
		return;
	}
	
	const { error } = await supabase.rpc("donar_dinero", {
		usuario_receptor_id: receptorId,
		monto_donacion: monto
	});
	
	if (error) {
		alert("Error: " + error.message);
		return;
	}
	
	alert("¡Donación completada!");
	
	if (userBalance) {
		let balanceactual = parseInt(userBalance.innerText) || 0;
		userBalance.innerText = balanceActual - monto;
	}
	
	if (userDonated) {
		let donadoActual = parseInt(userDonated.innerText) || 0;
		userDonated.innerText = donadoActual + monto;
	}
	
	if (userDonacionesHechas) {
		let cantActual = parseInt(userDonacionesHechas.innerText) || 0;
		userDonacionesHechas.innerText = cantActual + 1;
	}
	
	inputMonto.value = "";
	selectUser.selectedIndex = 0;
}

await cargarUsuarios();

enviarDonacion.addEventListener("click", procesarDonacion);
