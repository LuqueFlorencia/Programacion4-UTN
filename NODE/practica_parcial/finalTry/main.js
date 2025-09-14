import { SGP } from './GestorPedidos.js'
import { Pedido } from './pedido.js'

let gestorPedidos = new SGP();

gestorPedidos.crearClientes();
gestorPedidos.crearProductos();
gestorPedidos.crearRepartidores();
 
gestorPedidos.mostrarClientes();
gestorPedidos.mostrarProductos();
gestorPedidos.mostrarRepartidores();

let pedido = new Pedido(gestorPedidos.productos[0], gestorPedidos.clientes[0]);
gestorPedidos.agregarPedido(pedido);

gestorPedidos.agruparPorEstado();