import { EstadoInvalidoError } from './errores.js'

export class Informe {
    constructor(){
        this.pedidosPend = [];
        this.pedidosAsig = [];
        this.pedidosEnRuta = [];
        this.pedidosEntr = [];
        this.pedidosCancel = [];
    }

    registrarPedido(pedido){
        switch(pedido.estado){
            case 'pendiente':
                this.pedidosPend.push(pedido);
                break;
            case 'asignado':
                this.pedidosAsig.push(pedido);
                break;
            case 'enRuta':
                this.pedidosEnRuta.push(pedido);
                break;
            case 'entregado':
                this.pedidosEntr.push(pedido);
                break;
            case 'cancelado':
                this.pedidosCancel.push(pedido);
                break;
            default:
                throw new EstadoInvalidoError('El estado es invalido');
        }
    }
}