
				
	const formulario = document.getElementById("loginForm");
	const btnLogin = document.getElementById("login");
	const btnRegister = document.getElementById("register");


//APARTADO VISUAL


const ingreso = document.getElementById("ingreso");
const ISText = document.getElementById("iniciarSesionText");
const rtxt = document.getElementById("registrarseText");
const logIS = document.getElementById("tipoLogIS");
const logR = document.getElementById("tipoLogR");
const volver = document.getElementById("volver");


let estado = "inicio";

//funcion visual
function t(e){
	e.classList.toggle("h");
}
function toggleSet(clase) {
	const todos = document.querySelectorAll(`.${clase}`);
	todos.forEach(el => el.classList.toggle("h"));
}
				





t(ingreso);
t(logIS);
t(logR);

//eventos

logIS.addEventListener("click", () => {
	toggleSet("sesion");
	estado = "sesion";
});

logR.addEventListener("click", () => {
	toggleSet("registro");
	estado = "registro";
});
volver.addEventListener("click", () => {
	if(estado === "sesion") {
		toggleSet("sesion");
		estado = "inicio";
	} else if(estado === "registro") {
		toggleSet("registro");
		estado = "inicio";
	}
});

formulario.addEventListener("keypress", (e) => {
	if(e.key === "Enter") {
		e.preventDefault();
		return false;
	}
});


//LOGIN Y REGISTER
import { iniciarSesion, registrarUsuario } from "/js/auth.js"
	
	
	btnLogin.addEventListener("click", async (e) => {
		e.preventDefault();
	
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;
					
					
		const data = await iniciarSesion(email, password);
		if(data && data.user) {
			setTimeout(() => {
				window.location.href = "/html/inicio.html";
			}, 1500);
		} else {
			alert("Credenciales incorrectas");
		}
});
	
function clear(i){
	document.getElementById(i).reset();
}
				
btnRegister.addEventListener("click", async (e) => {
	e.preventDefault();

	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;
	const nombre = document.getElementById("name").value;
				
	await registrarUsuario(email, password, nombre);
	clear("loginForm");
	toggleSet("sesion");
	toggleSet("registro");
	estado = "sesion";
});
	
