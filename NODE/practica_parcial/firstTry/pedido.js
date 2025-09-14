import { faker } from '@faker-js/faker';

class Pedido {
  id;
  cliente;
  producto;
  estado;

  constructor(cliente, producto){
    this.id = faker.number.int({max: 999});
    this.cliente = cliente;
    this.producto = producto;
    this.estado = estado[0];
  }

  cancelar(pedido){
    pedido.estado = estado[4];
  }
}

let estado = {
  0: 'pendiente',
  1: 'asignado',
  2: 'en ruta',
  3: 'entregado',
  4: 'cancelado'
};

export default Pedido;



