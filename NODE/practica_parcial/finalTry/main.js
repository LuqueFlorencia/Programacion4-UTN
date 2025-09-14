import { SGP, getRandom, contadorPedidosPorCliente } from './GestorPedidos.js'
import { Pedido, estadoAleatorio } from './pedido.js'
import { obtenerUsuarios, crearUsuario } from './api.js';

const hoy = new Date().toLocaleDateString('es-AR');

let usuarios = await obtenerUsuarios();
await crearUsuario();

let gestorPedidos = new SGP();

gestorPedidos.crearClientes(usuarios);
gestorPedidos.crearProductos();
gestorPedidos.crearRepartidores(usuarios);
 
//gestorPedidos.mostrarClientes();
//gestorPedidos.mostrarProductos();
//gestorPedidos.mostrarRepartidores();

let interval = setInterval(() => {
    let estado = estadoAleatorio();
    let cliente = gestorPedidos.clientes[getRandom(10)];
    let producto = gestorPedidos.productos[getRandom(100)];

    let pedido = new Pedido(producto, cliente, estado);
    console.log(`Ingreso nuevo pedido: ${pedido.id} - Estado: ${pedido.estado} 
        Cliente: ${cliente.nombre} - VIP: ${cliente.isVIP}
        Producto: ${producto.nombre} - Tiempo de preparacion: ${producto.duracion} minutos`);
    console.log("---");
    
    
    gestorPedidos.agregarPedido(pedido);

    // Closure para contar los pedidos por cliente (no funciona)
    const contadorPedidos = contadorPedidosPorCliente(cliente);
    contadorPedidos();

}, 1000);

setTimeout(() => {
    clearInterval(interval);
    console.log('-- Se termino el dia laboral --');
    console.log(`TOTAL PEDIDOS ${hoy}: ${gestorPedidos.totalPedidos()}`);

    gestorPedidos.agruparPorEstado();

    console.log('-- Pedidos priorizados --');
    console.log(gestorPedidos.priorizarPedidos());
    
}, 20000);

// Ejemplo de coercion explicita
/*const objetoApi1 = {
    cliente: {id: 1, nombre: 'Juan Perez'},
    producto: {id: 1, nombre: 'ASD'},
    estado: 'pendiente',
    urgente: true
};

const objetoApi2 = {
    cliente: {id: "a", nombre: 'Juan Perez'},
    producto: {id: 2, nombre: 123}
};

let pedidoValido1 = new Pedido().validarEntradaPedido(objetoApi1);
console.log(pedidoValido1);

let pedidoValido2 = new Pedido().validarEntradaPedido(objetoApi2);
console.log(pedidoValido2);*/

