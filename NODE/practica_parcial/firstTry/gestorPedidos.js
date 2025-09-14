import { ProductoDuplicadoError } from './error.js'
import Informe from './informe.js'

class GestorPedidos {
  #pedidos = [];
  repartidores = [];

  agregarPedido(pedidos){
    pedidos.forEach(pedido => {
      for (let i = 0; i < this.#pedidos.length; i++) {
        if (pedido.id === this.#pedidos[i].id){
          throw new ProductoDuplicadoError();
        } 
      }
      this.#pedidos.push(pedido);
    });
  }

  mostrarPedidos(){
    let pedidosReadOnly = [];

    this.#pedidos.forEach(element => {
      let item = {id: element.id, estado: element.estado}
      pedidosReadOnly.push(item);
    });

    return pedidosReadOnly;
  }

  agruparPorEstado(){
    let informe = new Informe();

    this.#pedidos.forEach(element => {
      informe.agregarPedido(element);
    });

    return JSON.stringify(informe);
  }

  asignarPedidos(repartidores){

  }
}

export default GestorPedidos;