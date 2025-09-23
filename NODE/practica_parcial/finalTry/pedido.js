import { faker } from '@faker-js/faker'
import { EstadoInvalidoError, DatosIncompletosError } from './errores.js'
import { getRandom } from './GestorPedidos.js'

export class Pedido {
    constructor(producto, cliente, estado = 'pendiente', urgente = false){
        this.id = faker.number.int({min: 1, max: 999});
        this.cliente = cliente;
        this.repartidor = null;
        this.producto = producto;
        this.estado = this.isEstadoValido(estado) ?? estado;
        this.urgente = urgente;
    }

    // Valida que el estado del pedido este entre los valores permitidos, lanza error personalizado sino.
    isEstadoValido(estado){
        let resultado = false;
        estados.forEach(e => {
            if (estado === e){
                resultado = true;
            }
        });
        
        if (!resultado){
            throw new EstadoInvalidoError('El estado es invalido');
        }
    }

    // Coercion explicita de data que se obtenga de una api (por ej)
    validarEntradaPedido(objeto) {
        if (!objeto) throw new DatosIncompletosError('No se paso un objeto valido');

        const clienteId = Number(objeto.cliente.id);
        const clienteNombre = String(objeto.cliente.nombre);
        const productoId = Number(objeto.producto.id);
        const productoNombre = String(objeto.producto.nombre);
        const estado = String(objeto.estado);
        const urgente = Boolean(objeto.urgente);

        if (!clienteId || !clienteNombre || !productoId || !productoNombre || !estado || (urgente !== true && urgente !== false)){
            throw new DatosIncompletosError('Faltan datos obligatorios');
        }

        let cliente = {id: clienteId, nombre: clienteNombre};
        let producto = {id: productoId, nombre: productoNombre};

        return {cliente, producto, estado, urgente};
    }
}

// Metodo para cancelar un pedido
Pedido.prototype.cancelar = function(){
    this.estado = 'cancelado';
}

// Metodo para actualizar el estado de un pedido
Pedido.prototype.actualizarEstado = function(estado){
    if (isEstadoValido(estado)){
        this.estado = estado;
    }
}

export const estados = ['pendiente', 'asignado', 'enRuta', 'entregado', 'cancelado'];

// Función para obtener un estado aleatorio para al asignación de pedidos 
export function estadoAleatorio(){
    let num = getRandom(5);
    switch(num){
        case 0:
            return 'pendiente';
        case 1:
            return 'asignado';
        case 2:
            return 'enRuta';
        case 3:
            return 'entregado';
        default:
            return 'cancelado';
    }
}
