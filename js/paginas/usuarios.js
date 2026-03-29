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