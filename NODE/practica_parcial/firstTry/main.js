import Pedido from './pedido.js'
import Cliente from './cliente.js'
import Producto from './producto.js'
import GestorPedidos from './gestorPedidos.js'

let gestor = new GestorPedidos();

let cliente = new Cliente()
let producto = new Producto();
let pedido = new Pedido(cliente, producto);

let cliente2 = new Cliente()
let producto2 = new Producto();
let pedido2 = new Pedido(cliente2, producto2);

console.log(`El pedido nro: ${pedido.id} esta en estado ${pedido.estado}. \nProducto: ${JSON.stringify(pedido.producto)}. \nCliente: ${JSON.stringify(pedido.cliente)}`);
console.log('---');

console.log(`El pedido nro: ${pedido2.id} esta en estado ${pedido2.estado}. \nProducto: ${JSON.stringify(pedido2.producto)}. \nCliente: ${JSON.stringify(pedido2.cliente)}`);
console.log('---');

pedido.cancelar(pedido);

console.log(`El pedido nro: ${pedido.id} esta en estado ${pedido.estado}. \nProducto: ${JSON.stringify(pedido.producto)}. \nCliente: ${JSON.stringify(pedido.cliente)}`);
console.log('---');

gestor.agregarPedido([pedido, pedido2])
console.log(JSON.stringify(gestor.mostrarPedidos()));

console.log(gestor.agruparPorEstado());