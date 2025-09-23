import { EstadoInvalidoError } from './errores.js'

export class Informe {
    constructor(){
        this.pedidosPendientes = [];
        this.pedidosAsignados = [];
        this.pedidosEnRuta = [];
        this.pedidosEntregados = [];
        this.pedidosCancelados = [];
    }

    // Registra los pedidos acorde a su estado
    registrarPedido(pedido){
        let registro = {pedidoID: pedido.id, clienteID: pedido.cliente.id, productoID: pedido.producto.id};
        switch(pedido.estado){
            case 'pendiente':
                this.pedidosPendientes.push(registro);
                break;
            case 'asignado':
                this.pedidosAsignados.push(registro);
                break;
            case 'enRuta':
                this.pedidosEnRuta.push(registro);
                break;
            case 'entregado':
                this.pedidosEntregados.push(registro);
                break;
            case 'cancelado':
                this.pedidosCancelados.push(registro);
                break;
            default:
                throw new EstadoInvalidoError('El estado es invalido');
        }
    }
}