class Informe{
  pendiente = [];
  asignado = [];
  enRuta = [];
  entregado = [];
  cancelado = [];

  agregarPedido(pedido){
    switch (pedido.estado) {
        case 'pendiente':
          this.pendiente.push(pedido.id)
          break;

        case 'asignado':
          this.asignado.push(pedido.id)
          break;

        case 'enRuta':
          this.enRuta.push(pedido.id)
          break;

        case 'entregado':
          this.entregado.push(pedido.id)
          break;
        
        case 'cancelado':
          this.cancelado.push(pedido.id)
          break;
      
        default:
          break;
      }
  }
}

export default Informe;