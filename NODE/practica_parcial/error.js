export class EstadoInvalidoError extends Error{
  message = 'Estado no permitido';
}

export class ProductoDuplicadoError extends Error{
  message = 'El producto que intenta insertarse ya se encuentra en el gestor';
}