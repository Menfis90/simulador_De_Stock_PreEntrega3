
function validarCantidad(entrada, permitirCero) {
    if (entrada === null || entrada.trim() === "") {
        return false;
    }

    const cantidad = Number(entrada);

    if (!Number.isInteger(cantidad) || cantidad < 0) {
        return false;
    }

    if (!permitirCero && cantidad === 0) {
        return false;
    }

    return true;
}

const procesarVenta = function(stockActual, cantidad) {
    if (cantidad > stockActual) {
        return {
            realizada: false,
            stockRestante: stockActual,
            mensaje: "Stock insuficiente. No se realizó la venta."
        };
    }

    return {
        realizada: true,
        stockRestante: stockActual - cantidad,
        mensaje: "Venta registrada correctamente."
    };
};

const normalizarRespuesta = (respuesta) => {
    return respuesta.trim().toLowerCase();
};

function mostrarResumen(nombre, ventas, stockFinal) {
    console.log("=== RESUMEN FINAL ===");
    console.log("Producto: " + nombre);
    console.log("Unidades vendidas: " + ventas);
    console.log("Stock final: " + stockFinal);

    alert(
        "Simulación finalizada.\n" +
        "Producto: " + nombre +
        "\nUnidades vendidas: " + ventas +
        "\nStock final: " + stockFinal
    );
}

// ENTRADA DE DATOS
const nombreProducto = prompt("Ingresá el nombre del producto:");
const ingresoStock = prompt("¿Cuántas unidades hay disponibles?");

let stock = 0;
let ventasRealizadas = 0;
let continuar = "si";

if (nombreProducto === null || nombreProducto.trim() === "") {
    alert("No ingresaste un nombre de producto.");
} else if (!validarCantidad(ingresoStock, true)) {
    alert("El stock debe ser un número entero mayor o igual a cero.");
} else {
    stock = Number(ingresoStock);

    console.log("=== SIMULADOR DE CONTROL DE STOCK ===");
    console.log("Producto: " + nombreProducto);
    console.log("Stock inicial: " + stock);

    while (continuar === "si") {
        const ingresoVenta = prompt(
            "Producto: " + nombreProducto +
            "\nStock disponible: " + stock +
            "\n¿Cuántas unidades querés vender?" +
            "\nEscribí 0 para no realizar una venta."
        );

        if (ingresoVenta === null) {
            continuar = "no";
            console.log("Se canceló el registro de ventas.");
        } else if (!validarCantidad(ingresoVenta, true)) {
            alert(
                "Ingresá una cantidad válida: un número entero " +
                "mayor o igual a cero."
            );
        } else {
            const cantidad = Number(ingresoVenta);

            if (cantidad === 0) {
                console.log("No se registró ninguna venta.");
            } else {
                const resultado = procesarVenta(stock, cantidad);

                if (resultado.realizada) {
                    stock = resultado.stockRestante;
                    ventasRealizadas += cantidad;

                    console.log(
                        "Venta registrada: " + cantidad + " unidades."
                    );
                    console.log("Stock restante: " + stock);

                    alert(resultado.mensaje);
                } else {
                    console.log(resultado.mensaje);
                    alert(resultado.mensaje);
                }
            }

            const respuesta = prompt(
                "¿Querés registrar otra venta? Escribí si o no."
            );

            if (respuesta === null) {
                continuar = "no";
            } else {
                const respuestaNormalizada =
                    normalizarRespuesta(respuesta);

                if (respuestaNormalizada === "si") {
                    continuar = "si";
                } else if (respuestaNormalizada === "no") {
                    continuar = "no";
                } else {
                    alert("Respuesta no válida. El simulador finalizará.");
                    continuar = "no";
                }
            }
        }
    }

    mostrarResumen(nombreProducto, ventasRealizadas, stock);
}
