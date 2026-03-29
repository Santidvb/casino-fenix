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


//propio
import { actualizar, perfil, toggleHide } from "../funcionesBase.js";


const userName = document.getElementById("nombreUser");
const userBalance = document.getElementById("dineroUser");
const userID = document.getElementById("userID");
const userDescription = document.getElementById("descripcionUser");
const userFriends = document.getElementById("userFriends");
const userInventory = document.getElementById("inventarioUser");
const userDonated = document.getElementById("donationUser");
const userDeuda = document.getElementById("deudaUser");
const userComprasHechas = document.getElementById("userComprasHechas");
const userRangoActual = document.getElementById("userRangoActual");
const userDineroGastado = document.getElementById("userDineroGastado");
const userDonacionesRecibidas = document.getElementById("userDonacionesRecibidas");
const userNivel = document.getElementById("userNivel");

const descripcionInput = document.getElementById("descripcionInput");
const editDescription = document.getElementById("editDescription");
const confirmarDescripcion = document.getElementById("editDescriptionConfirmar");
const editCancelar = document.getElementById("editCancelar");

const info = await perfil();

userID.innerText = info.mayor_historico;
userName.innerText = info.username;
userBalance.innerText = info.dinero_actual;
userDescription.innerText = info.descripcion;
userInventory.innerText = info.coleccion;
userDeuda.innerText = info.deuda;
userDonated.innerText = info.dinero_donado;
userFriends.innerText = info.amigos;
userComprasHechas.innerText = info.compras_hechas;
userRangoActual.innerText = info.top_rank;
userDineroGastado.innerText = info.dinero_gastado;
userDonacionesRecibidas.innerText = info.donaciones_recibidas;
userNivel.innerText = info.nivel;

toggleHide(userDescription);
toggleHide(editDescription);

editDescription.addEventListener("click", () => {
    toggleHide(descripcionInput);
    toggleHide(confirmarDescripcion);
    toggleHide(userDescription);
    toggleHide(editDescription);
    toggleHide(editCancelar);
});

confirmarDescripcion.addEventListener("click", async () => {
    let nuevaDescripcion = descripcionInput.value;
    let cambios = { descripcion: nuevaDescripcion };
    await actualizar(cambios);
    userDescription.innerText = nuevaDescripcion;
    info.descripcion = nuevaDescripcion
    toggleHide(descripcionInput);
    toggleHide(confirmarDescripcion);
    toggleHide(userDescription);
    toggleHide(editDescription);
    toggleHide(editCancelar);
});

editCancelar.addEventListener("click", () => {
    toggleHide(descripcionInput);
    toggleHide(confirmarDescripcion);
    toggleHide(userDescription);
    toggleHide(editDescription);
    toggleHide(editCancelar);
})

descripcionInput.addEventListener("keydown", async (e) => {
    if(e.key === "Enter"){
        let nuevaDescripcion = descripcionInput.value;
        let cambios = { descripcion: nuevaDescripcion };
        await actualizar(cambios);
        userDescription.innerText = nuevaDescripcion;
        info.descripcion = nuevaDescripcion
        toggleHide(descripcionInput);
        toggleHide(confirmarDescripcion);
        toggleHide(userDescription);
        toggleHide(editDescription);
        toggleHide(editCancelar);
        descripcionInput.value = "";
    }
});