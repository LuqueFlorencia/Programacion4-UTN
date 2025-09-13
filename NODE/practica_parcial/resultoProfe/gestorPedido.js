const Pedido = require("./Pedido");

class GestorPedidos {
  #pedidos = [];
  listaEspera = [];

  agregarPedido(pedido) {
    const duplicado = this.#pedidos.some(p => p.id === pedido.id);
    if (duplicado) {
      throw new Error("Pedido duplicado");
    }
    this.#pedidos.push(pedido);
  }

  agruparPorEstado() {
    return this.#pedidos.reduce((acc, pedido) => {
      if (!acc[pedido.estado]) acc[pedido.estado] = [];
      acc[pedido.estado].push(pedido);
      return acc;
    }, { pendiente: [], asignado: [], enRuta: [], entregado: [], cancelado: [] });
  }

  asignarPedidos(repartidores) {
    let idx = 0;
    for (let pedido of this.#pedidos.filter(p => p.estado === "pendiente")) {
      const repartidor = repartidores[idx % repartidores.length];
      if (!pedido.repartidor) pedido.repartidor = repartidor;

      const asignados = this.#pedidos.filter(p => p.repartidor === repartidor && p.estado !== "cancelado");
      if (asignados.length > 3) {
        this.listaEspera.push(pedido);
      } else {
        pedido.actualizarEstado("asignado");
      }
      idx++;
    }
  }

  contadorPedidosPorCliente(cliente) {
    let contador = 0;
    return () => {
      contador++;
      console.log(`Cliente ${cliente} ya hizo ${contador} pedidos.`);
      return contador;
    };
  }

  validarEntradaPedido(obj) {
    if (!obj.id || !obj.cliente || !obj.producto) {
      throw new Error("Datos incompletos");
    }
    return new Pedido(
      Number(obj.id),
      String(obj.cliente),
      String(obj.producto),
      obj.estado ? String(obj.estado) : "pendiente"
    );
  }

  priorizarPedidos(clientesVIP, productosLentos) {
    const alta = [];
    const media = [];
    const baja = [];

    for (let pedido of this.#pedidos) {
      if (clientesVIP.includes(pedido.cliente)) {
        alta.push(pedido);
      } else if (productosLentos.includes(pedido.producto)) {
        media.push(pedido);
      } else {
        baja.push(pedido);
      }
    }

    if (alta.length > 2) {
      console.log("Hay demasiados pedidos de alta prioridad, se bloquean los de baja.");
      return [...alta, ...media];
    }

    return [...alta, ...media, ...baja];
  }

  totalPedidos() {
    return this.#pedidos.length;
  }
}

module.exports = GestorPedidos;
