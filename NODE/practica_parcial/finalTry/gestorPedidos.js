import { Cliente } from './cliente.js'
import { Repartidor } from './repartidor.js'
import { Producto } from './producto.js'
import { Informe } from './informe.js'
import { PedidoDuplicadoError } from './errores.js'

export class SGP {
    #pedidos = [];
    constructor(){
        this.numClientes =  getRandom();
        this.numProductos = getRandom();
        this.numRepartidores = getRandom();
        this.clientes = [];
        this.productos = [];
        this.repartidores = [];
        this.listaEspera = [];
    }

    crearClientes(){
        for (let i = 0; i < this.numClientes; i++) {
            let cliente = new Cliente();
            this.clientes.push(cliente);
        }
    }

    mostrarClientes(){
        this.clientes.forEach(cliente => {
            console.log(cliente);
        });
    }

    crearRepartidores(){
        for (let i = 0; i < this.numRepartidores; i++) {
            let repartidor = new Repartidor();
            this.repartidores.push(repartidor);
        }
    }

    mostrarRepartidores(){
        this.repartidores.forEach(repartidor => {
            console.log(repartidor);
        });
    }

    crearProductos(){
        for (let i = 0; i < this.numProductos; i++) {
            let producto = new Producto();
            this.productos.push(producto);
        }
    }

    mostrarProductos(){
        this.productos.forEach(producto => {
            console.log(producto);
        });
    }

    agregarPedido(pedido){
        this.#pedidos.forEach(item => {
            if (pedido.id === item.id){
                throw new PedidoDuplicadoError('Pedido Duplicado');
            }
        });
        this.#pedidos.push(pedido);
    }

    agruparPorEstado(){
        let informe = new Informe();
        this.#pedidos.forEach(item => {
            informe.registrarPedido(item);
        });
        console.log(informe);
    }

    asignarPedido(repartidores){
        let cont = 0;
        for (let pedido of this.#pedidos.filter(p => p.estado === 'pendiente')) {
            const repartidor = repartidores[cont % repartidores.length];
            if (!pedido.repartidor) pedido.repartidor = repartidor;

            const asignados = this.#pedidos.filter(p => p.repartidor === repartidor && p.estado !== 'cancelado');
            if (asignados.length > 3){
                this.listaEspera.push(pedido);
            } else {
                pedido.actualizarEstado('asignado');
            }
            cont++;
        }
    }
}

export function getRandom(max = 10) {
    let num = 1 + (Math.random() * max);
    return Math.floor(num);
}
