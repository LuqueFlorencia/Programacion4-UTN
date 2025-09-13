const Pedido = require("./Pedido");
const GestorPedidos = require("./GestorPedidos");

const gestor = new GestorPedidos();

function generarPedidoRandom() {
  const productos = ["Pizza", "Empanadas", "Hamburguesa", "Tarta"];
  const clientes = ["Ana", "Luis", "Marta", "Pedro"];
  return new Pedido(
    Math.floor(Math.random() * 10000),
    clientes[Math.floor(Math.random() * clientes.length)],
    productos[Math.floor(Math.random() * productos.length)]
  );
}

// llegan pedidos cada 3s
const intervalId = setInterval(() => {
  const nuevo = generarPedidoRandom();
  try {
    gestor.agregarPedido(nuevo);
    console.log("Nuevo pedido agregado:", nuevo);
  } catch (e) {
    console.log("Error:", e.message);
  }

  const pendientes = gestor.agruparPorEstado().pendiente.length;
  if (pendientes > 10) {
    console.log("Demasiados pedidos sin asignar");
    clearInterval(intervalId);
  }
}, 3000);

// ejemplo Promise.all con entregas
function simularEntrega(pedido, ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      pedido.actualizarEstado("entregado");
      resolve(pedido);
    }, ms);
  });
}

async function procesarEntregas() {
  const pedidosAsignados = gestor.agruparPorEstado().asignado.slice(0, 3);
  if (pedidosAsignados.length === 0) {
    console.log("No hay pedidos asignados para entregar todavía.");
    return;
  }

  const resultados = await Promise.all([
    simularEntrega(pedidosAsignados[0], 2000),
    simularEntrega(pedidosAsignados[1], 3000),
    simularEntrega(pedidosAsignados[2], 4000)
  ]);
  console.log("Pedidos entregados:", resultados);
}

// coerción de ejemplo
const p1 = new Pedido("5", "Carlos", "Pizza");
console.log("==:", p1.id == 5);   // true
console.log("===:", p1.id === 5); // false

// ejemplo de closure
const contadorAna = gestor.contadorPedidosPorCliente("Ana");
contadorAna();
contadorAna();
