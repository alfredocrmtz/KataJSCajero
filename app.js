
const btnIniciarSesion = document.querySelector("#ingresarCuenta");
const btnCerrarModalSesion = document.querySelector("#cerrarModalSesion");
const btnDepositar = document.querySelector("#depositar");
const btnConsultar = document.querySelector("#consultar");
const btnRetirar = document.querySelector("#retirar");
const btnTerminar = document.querySelector("#terminar");
const btnTomarEfectivo = document.querySelector("#tomarEfectivo");
const btnNumeroCuenta = document.querySelector("#numeroCuenta");
const btnConfirmaRetiro = document.querySelector("#confirmaRetiro");
const btnConfirmarDeposito = document.querySelector("#confirmaDeposito");

const alertMensajesEstatus = document.getElementById("mensages");
const msgBienvenida = document.getElementById("bienvenida");
const msgSecundario = document.getElementById("mensajeSecundario");
const msgRetiro = document.getElementById("mensajeRetiro");
const msgDeposito = document.getElementById("mensajeDeposito");

const MONTO_MINIMO = 10;
const MONTO_MAXIMO = 990;

const inputRetiroEfectivo = document.getElementById("retiroEfectivo");
const inputDepositoEfectivo = document.getElementById("depositoEfectivo");

let strNumeroDeCuenta = 0;
let informacionCuentabiente = {};

let cuentabientes = [
    { cuenta: 3476, nombre: "Mali", saldo: 200, password: 2345, intentosAcceso: 0, bloqueada: false },
    { cuenta: 5648, nombre: "Gera", saldo: 290, password: 4875, intentosAcceso: 0, bloqueada: false },
    { cuenta: 2917, nombre: "Maui", saldo: 67, password: 9628, intentosAcceso: 0, bloqueada: false },
];

function mostrarSaldo() {
    mensagesAlerta("¡Su saldo disponible es de $" + informacionCuentabiente.saldo + "!", "success");
    msgBienvenida.innerText = "¡Hola " + informacionCuentabiente.nombre + "!";
    msgSecundario.innerText = "";
}

function movimiento(cantidad) {
    for (let i = 0; i < cuentabientes.length; i++) {
        if (cuentabientes[i].cuenta === strNumeroDeCuenta) {
            cuentabientes[i].saldo = cuentabientes[i].saldo + Number(cantidad);
            informacionCuentabiente = cuentabientes[i];
            return informacionCuentabiente.saldo;
        }
    }
}

function validarDeposito(cantidad) {
    mensagesAlerta("¡Depósito de efectivo!", "info");
    if (cantidad <= 0) {
        mensagesAlerta("!Solo puede depositar cantidades mayores a CERO!", "warning");
        inputDepositoEfectivo.value = "";
        return false;
    } else if ((informacionCuentabiente.saldo + cantidad) > MONTO_MAXIMO) {
        mensagesAlerta("!Su saldo final excedería la cantidad máxima permitida, intente con una cantidad menor!", "warning");
        inputDepositoEfectivo.value = "";
        return false;
    } else {
        return true;
    }
}

function validarRetiro(cantidad) {
    mensagesAlerta("¡Retiro de efectivo!", "info");
    if (cantidad > informacionCuentabiente.saldo) {
        mensagesAlerta("¡Saldo insuficiente, intente con una cantidad menor!", "warning");
        inputRetiroEfectivo.value = "";
        return false;
    } else if (cantidad <= 0) {
        mensagesAlerta("¡Solo puede retirar cantidades mayores a CERO!", "warning");
        inputRetiroEfectivo.value = "";
        return false;
    } else if ((informacionCuentabiente.saldo - cantidad) <= MONTO_MINIMO) {
        mensagesAlerta("¡Saldo insuficiente, su cuenta no debe tener menos de $" + MONTO_MINIMO + "!", "warning");
        inputRetiroEfectivo.value = "";
        return false;
    } else {
        return true;
    }
}

function validaDatos(numberCenta, nip) {
    let accesoValido = 1; //1. datos validos, 2, cuenta bloqueada, 3. passwor no valido, 4. datos no localizados.
    for (let i = 0; i < cuentabientes.length; i++) {
        if (cuentabientes[i].cuenta === numberCenta && cuentabientes[i].intentosAcceso < 3) {
            if (cuentabientes[i].cuenta === numberCenta && cuentabientes[i].password === nip) {
                accesoValido = 1;
                strNumeroDeCuenta = cuentabientes[i].cuenta;
                informacionCuentabiente = cuentabientes[i];
            } else if (cuentabientes[i].cuenta === numberCenta && cuentabientes[i].password != nip) {
                cuentabientes[i].intentosAcceso++;
                accesoValido = 3;
            }
            break;
        } else if (cuentabientes[i].cuenta === numberCenta && cuentabientes[i].intentosAcceso >= 3) {
            cuentabientes[i].bloqueada = true;
            accesoValido = 2;
            break;
        } else {
            accesoValido = 4;
        }
    }

    return accesoValido;
}

function habilitarOperaciones(estatus) {
    if (estatus) {
        mensagesAlerta("¡Seleccione la operación que desea realizar en los controles laterales!", "success");
        msgBienvenida.innerText = "¡Hola " + informacionCuentabiente.nombre + "!";
        msgSecundario.innerText = "";

        btnDepositar.removeAttribute("hidden");
        btnConsultar.removeAttribute("hidden");
        btnRetirar.removeAttribute("hidden");
        btnTerminar.removeAttribute("hidden");
        btnTomarEfectivo.setAttribute("hidden", "true");
        btnNumeroCuenta.removeAttribute("show");
        btnNumeroCuenta.setAttribute("hidden", "true");

        msgRetiro.removeAttribute("show");
        msgRetiro.setAttribute("hidden", "true");
        msgDeposito.removeAttribute("show");
        msgDeposito.setAttribute("hidden", "true");

        btnTomarEfectivo.removeAttribute("show");
        btnTomarEfectivo.setAttribute("hidden", "true");
    } else {
        informacionCuentabiente = {};
        mensagesAlerta("¡Sesión cerrada!", "cerrar");
        msgBienvenida.innerText = "Bienvenido.";
        msgSecundario.innerText = "Ingrese su número de cuenta.";

        btnDepositar.setAttribute("hidden", "true");
        btnConsultar.setAttribute("hidden", "true");
        btnRetirar.setAttribute("hidden", "true");
        btnTerminar.setAttribute("hidden", "true");
        btnTomarEfectivo.setAttribute("hidden", "true");
        btnNumeroCuenta.removeAttribute("hidden");
        btnNumeroCuenta.setAttribute("show", "true");

        msgRetiro.removeAttribute("show");
        msgRetiro.setAttribute("hidden", "true");
        msgDeposito.removeAttribute("show");
        msgDeposito.setAttribute("hidden", "true");

        btnTomarEfectivo.removeAttribute("show");
        btnTomarEfectivo.setAttribute("hidden", "true");
    }

}

btnIniciarSesion.addEventListener('click', function () {
    let numeroDeCuenta = document.querySelector("#cuentaUsuario");
    let nipUsuario = document.querySelector("#nipUsuario");
    if ((Number(numeroDeCuenta.value) > 0 && Number(numeroDeCuenta.value) != undefined) && (Number(nipUsuario.value) > 0 && Number(nipUsuario.value) != undefined)) {
        switch (validaDatos(Number(numeroDeCuenta.value), Number(nipUsuario.value))) {
            case 1:
                habilitarOperaciones(true);
                break;
            case 2:
                mensagesAlerta("¡Su cuenta ha sido bloqueada intente en las próximas 48 horas!", "danger");
                msgBienvenida.innerText = "";
                msgSecundario.innerText = "";
                break;
            case 3:
                mensagesAlerta("¡Los datos ingresados no son correctos!", "danger");
                msgBienvenida.innerText = "";
                msgSecundario.innerText = "";
                break;
            case 4:
                mensagesAlerta("¡Usted no es cuentahabiente!", "danger");
                msgBienvenida.innerText = "";
                msgSecundario.innerText = "";
                break;
            default:
                console.log("Respuesta desconocida");
                break;
        }
    } else {
        mensagesAlerta("¡Datos de acceso incorrectos...!", "danger");
        msgBienvenida.innerText = "";
        msgSecundario.innerText = "";
    }
    btnCerrarModalSesion.click();
    numeroDeCuenta.value = "";
    nipUsuario.value = "";
});

btnTerminar.addEventListener('click', function () {
    habilitarOperaciones(false);
});

btnRetirar.addEventListener('click', function () {
    habilitarOperaciones(true);
    mensagesAlerta("¡Retiro de efectivo!", "info");
    msgRetiro.removeAttribute("hidden");
});

btnDepositar.addEventListener('click', function () {
    habilitarOperaciones(true);
    mensagesAlerta("¡Depósito de efectivo!", "info");
    msgDeposito.removeAttribute("hidden");
});

btnConfirmaRetiro.addEventListener('click', function () {
    let retiro = Number(inputRetiroEfectivo.value);
    if (validarRetiro(retiro)) {
        btnTomarEfectivo.removeAttribute("hidden");
        btnTomarEfectivo.setAttribute("show", "true");
    }
});

btnTomarEfectivo.addEventListener('click', function () {
    let retiro = inputRetiroEfectivo.value;
    habilitarOperaciones(true);
    mensagesAlerta(`¡Su saldo era de $${informacionCuentabiente.saldo}!\nUsted retiro $${retiro}\nSu saldo actual es de $${movimiento((retiro * -1))}`, "warning");
    inputRetiroEfectivo.value = "";
});

btnConsultar.addEventListener('click', function () {
    habilitarOperaciones(true);
    mostrarSaldo();
});

btnConfirmarDeposito.addEventListener('click', function () {
    let deposito = Number(inputDepositoEfectivo.value);
    if (validarDeposito(deposito)) {
        habilitarOperaciones(true);
        mensagesAlerta(`¡Su saldo era de $${informacionCuentabiente.saldo}!\nUsted depósito $${deposito}\nSu saldo actual es de $${movimiento(deposito)}`, "success");
        inputDepositoEfectivo.value = "";
    }
});

btnNumeroCuenta.addEventListener('click', function () {
    habilitarOperaciones(false);
});

function mensagesAlerta(texto, tipo) {
    alertMensajesEstatus.classList = "";
    alertMensajesEstatus.innerText = texto;
    alertMensajesEstatus.removeAttribute("hidden");
    switch (tipo) {
        case "primary":
            alertMensajesEstatus.classList = "alert alert-primary position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "secondary":
            alertMensajesEstatus.classList = "alert alert-secondary position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "success":
            alertMensajesEstatus.classList = "alert alert-success position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "danger":
            alertMensajesEstatus.classList = "alert alert-danger position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "warning":
            alertMensajesEstatus.classList = "alert alert-warning position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "info":
            alertMensajesEstatus.classList = "alert alert-info position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "light":
            alertMensajesEstatus.classList = "alert alert-light position-absolute bottom-50  start-50 translate-middle-x";
            break;
        case "dark":
            alertMensajesEstatus.classList = "alert alert-dark position-absolute bottom-50  start-50 translate-middle-x";
            break;
        default:
            alertMensajesEstatus.setAttribute("hidden", "true");
            break;
    }
}