
const btnNumerodeCuenta = document.querySelector("#numeroCuenta");
const btnIniciarSesion = document.querySelector("#ingresarCuenta");
const btnCerrarModalSesion = document.querySelector("#cerrarModalSesion");

let strNumeroDeCuenta = 0;

let cuentabientes = [
    { cuenta: 3476, nombre: "Mali", saldo: 200, password: 2345, intentosAcceso: 0, bloqueada: false },
    { cuenta: 5648, nombre: "Gera", saldo: 290, password: 4875, intentosAcceso: 0, bloqueada: false },
    { cuenta: 2917, nombre: "Maui", saldo: 67, password: 9628, intentosAcceso: 0, bloqueada: false },
];

function retirar(cuenta, cantidad) {

}

function depositar(cuenta, cantidad) {

}

function validaDatos(numberCenta, nip) {
    let accesoValido = 1; //1. datos validos, 2, cuenta bloqueada, 3. passwor no valido, 4. datos no localizados.
    for (let detalleCuenta of cuentabientes) {
        if (detalleCuenta.cuenta === numberCenta && detalleCuenta.intentosAcceso < 3) {
            if (detalleCuenta.cuenta === numberCenta && detalleCuenta.password === nip) {
                accesoValido = 1;
                strNumeroDeCuenta = detalleCuenta.cuenta;
            } else if (detalleCuenta.cuenta === numberCenta && detalleCuenta.password != nip) {
                detalleCuenta.intentosAcceso++;
                accesoValido = 3;
            }
            break;
        } else if (detalleCuenta.cuenta === numberCenta && detalleCuenta.intentosAcceso >= 3) {
            detalleCuenta.bloqueada = true;
            accesoValido = 2;
            break;
        } else {
            accesoValido = 4;
        }
    }

    return accesoValido;
}

btnIniciarSesion.addEventListener('click', function () {
    let numeroDeCuenta = document.querySelector("#cuentaUsuario");
    let nipUsuario = document.querySelector("#nipUsuario");
    if ((Number(numeroDeCuenta.value) > 0 && Number(numeroDeCuenta.value) != undefined) && (Number(nipUsuario.value) > 0 && Number(nipUsuario.value) != undefined)) {
        switch (validaDatos(Number(numeroDeCuenta.value), Number(nipUsuario.value))) {
            case 1:
                console.log("Acceso concedido: "+detalleCuenta.nombre);
                btnCerrarModalSesion.click();
                break;
            case 2:
                console.log("Cuenta bloqueada");                
                break;
            case 3:
                console.log("NIP incorrecto");
                break;
            case 4:
                console.log("Ustede no es cuentabiente");                
                break;
            default:
                console.log("Respuesta desconocida");
                btnCerrarModalSesion.click();
                break;
        }
    } else {
        console.log("Datos de acceso incorrectos...")
    }
});

