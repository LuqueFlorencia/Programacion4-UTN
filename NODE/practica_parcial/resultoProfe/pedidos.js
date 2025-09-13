class Pedido {
  constructor(id, cliente, producto, estado = "pendiente") {
    this.id = id;
    this.cliente = cliente;
    this.producto = producto;
    this.estado = estado;
  }

  actualizarEstado(nuevoEstado) {
    const validos = ["pendiente", "asignado", "en ruta", "entregado", "cancelado"];
    if (!validos.includes(nuevoEstado)) {
      throw new Error(`EstadoInvalidoError: ${nuevoEstado} no es un estado permitido`);
    }
    this.estado = nuevoEstado;
  }
}

// método dinámico agregado al prototipo
Pedido.prototype.cancelar = function () {
  this.estado = "cancelado";
};

module.exports = Pedido;