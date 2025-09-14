import { Cliente } from './cliente.js'
import { Repartidor } from './repartidor.js'
import { Producto } from './producto.js'
import { Informe } from './informe.js'
import { PedidoDuplicadoError } from './errores.js'

export class SGP {
    #pedidos = [];
    constructor(){
        this.numClientes =  10;
        this.numProductos = 100;
        this.numRepartidores = 5;
        this.clientes = [];
        this.clientesVIP = [];
        this.productos = [];
        this.productosLentos = [];
        this.repartidores = [];
        this.listaEspera = [];
        this.prioridad;
    }

    // Agrega clientes por default. Si se le envian datos (de la API) carga esos, sino crea clientes random con faker.
    crearClientes(clientes){        
        if (clientes.length === 0){
            for (let i = 0; i < this.numClientes; i++) {
                let cliente = new Cliente();
                this.clientes.push(cliente);
            }
        } else {
            clientes.forEach(element => {     
                let isVIP = getRandom(2) === 1 ? true : false;          
                let cliente = new Cliente(element.id, element.name, isVIP);
                this.clientes.push(cliente);
            });
        }
    }

    mostrarClientes(){
        this.clientes.forEach(cliente => {
            console.log(cliente);
        });
    }

    // Agrega repartidores por default. Si se le envian datos (de la API) carga esos, sino crea repartidores random con faker.
    crearRepartidores(repartidores){
        if (repartidores.length === 0){
            for (let i = 0; i < this.numRepartidores; i++) {
                let repartidor = new Repartidor();
                this.repartidores.push(repartidor);
            }
        } else {
            repartidores.forEach(element => {
                let repartidor = new Repartidor(element.id, element.name);
                this.repartidores.push(repartidor);
            });
        }
    }

    mostrarRepartidores(){
        this.repartidores.forEach(repartidor => {
            console.log(repartidor);
        });
    }

    // Crea productos random con faker.
    crearProductos(){
        for (let i = 0; i < this.numProductos; i++) {
            let duracion = getRandom(60);
            let producto = new Producto(duracion);
            this.productos.push(producto);
        }
    }

    mostrarProductos(){
        this.productos.forEach(producto => {
            console.log(producto);
        });
    }

    // Agrega un pedido al sistema, validando que no exista el mismo pedido previamente 
    agregarPedido(pedido){
        this.#pedidos.forEach(item => {
            if (pedido.id === item.id){
                throw new PedidoDuplicadoError('Pedido Duplicado');
            }
        });
        this.#pedidos.push(pedido);
    }

    // Agrupa los pedidos por su estado y crea un informe personalizado
    agruparPorEstado(){
        let informe = new Informe();
        this.#pedidos.forEach(item => {
            informe.registrarPedido(item);
        });
        console.log(informe);
    }

    // Asignación de pedidos a los repartidores 
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

    // Mostrar los pedidos de cada cliente 
    mostrarPedidosPorClientes(clientes){
        clientes.forEach(cliente => {
            console.log(`Cliente ID: ${cliente.id} - Nro de pedidos: ${cliente.numPedidosHechos}`);
            
        });
    }

    // ACA SI SE PUEDE DEFINIR EL METODO totalPedidos Y ACCEDER A LA PROPIEDAD #pedidos
    totalPedidos(){
        return this.#pedidos.length;
    }

    // Prioriza los pedidos segun: si el cliente que lo solicita es VIP, si el pedido tarda mas de 30 min en prepararse o no tiene una caracteristica particular.
    priorizarPedidos(){
        this.#pedidos.forEach(pedido => {
            if (pedido.cliente.isVIP) {
                pedido.prioridad = 'alta';
            } else if (pedido.producto.duracion > 30) {
                pedido.prioridad = 'media';
            } else {
                pedido.prioridad = 'baja';
            }
        });

        let prioridadAlta = this.#pedidos.filter(p => p.prioridad === 'alta');
        console.log(prioridadAlta);
        
        let prioridadMedia = this.#pedidos.filter(p => p.prioridad === 'media');
        console.log(prioridadMedia);

        let prioridadBaja = this.#pedidos.filter(p => p.prioridad === 'baja');
        console.log(prioridadBaja);

        return {
            PrioridadAlta: prioridadAlta,
            PrioridadMedia: prioridadMedia,
            PrioridadBaja: prioridadBaja,
        }
    }
}

// Genera un numero aleatorio 
export function getRandom(max = 10) {
    let num = Math.random() * max;
    return Math.floor(num);
}

// Closure para mantener información sobre los pedidos del cliente (no funciona)
export function contadorPedidosPorCliente(cliente){
    let contPedidos = 0;
   
    return function (){
        contPedidos++;
        cliente.actualizarNroPedidos(contPedidos);
        return contPedidos;
    }
}

/* ESTA FUNCION NO ESTA PERMITIDA FUERA DEL CUERPO DE LA CLASE PORQUE INTENTA ACCEDER A UNA PROPIEDAD PRIVADA
export function totalPedidos(){
    return this.#pedidos.length;
}*/

export const prioridades = ['alta', 'media', 'baja'];