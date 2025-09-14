import { faker } from '@faker-js/faker'
import { EstadoInvalidoError } from './errores.js'

export class Pedido {
    constructor(producto, cliente, estado = 'pendiente'){
        this.id = faker.number.int({max: 999});
        this.cliente = cliente;
        this.repartidor = null;
        this.producto = producto;
        this.estado = this.isEstadoValido(estado) ?? estado;
    }

    isEstadoValido(estado){
        let resultado;
        estados.forEach(e => {
            if (estado === e){
                resultado = true;
            }
        });
        
        if (!resultado){
            throw new EstadoInvalidoError('El estado es invalido');
        }
    }
}

Pedido.prototype.cancelar = function(){
    this.estado = 'cancelado';
}

Pedido.prototype.actualizarEstado = function(estado){
    if (isEstadoValido(estado)){
        this.estado = estado;
    }
}

export const estados = ['pendiente', 'asignado', 'enRuta', 'entregado', 'cancelado'];
