from django.shortcuts import render
from django.http import HttpResponse

def saludo(request):
  nombre = None
  resultado = None

  if request.method == 'POST':
    try:
      nombre = request.POST.get('nombre')
      resultado = f"Hola, {nombre}. Bienvenido a tu primer proyecto en Django."
    except (ValueError, TypeError):
      resultado = "Nombre inválido"

  return render(request, 'fabrica/saludar_formulario.html', { #Parametros
    'nombre': nombre,
    'resultado': resultado #Conjunto de strings 
  })

def tabla_multiplicar(request, numero):
  try:
    n = int(numero)
  except ValueError:
    return HttpResponse("Por favor, ingrese un numero valido")
  
  resultado = f"<h2>Tabla de multiplicar del {n}</h2><ul>"
  for i in range(1, 11):
    resultado += f"<li>{n} × {i} = {n * i}</li>"
    resultado += "</ul>"

  return HttpResponse(resultado)

def formulario_tabla(request):
  resultado = None
  numero = None

  if request.method == 'POST':
    try:
      numero = int(request.POST.get('numero'))
      resultado = [(numero, i, numero * i) for i in range(1, 11)]
    except (ValueError, TypeError):
      resultado = "Número inválido"

  return render(request, 'fabrica/tabla_formulario.html', { #Parametros
    'numero': numero,
    'resultado': resultado #Conjunto de strings 
  })

PRODUCTOS = {
  "A1": {"nombre": "Mouse", "precio": 1500, "descripcion": "Mouse óptico USB de 1200 DPI."},
  "B2": {"nombre": "Teclado", "precio": 3200, "descripcion": "Teclado mecánico con switches azules."},
}

def producto_detalle(request, codigo):
  codigo = (codigo or "").upper().strip()
  producto = PRODUCTOS.get(codigo)
  ctx = {"codigo": codigo, "producto": producto}
  return render(request, "fabrica/productos.html", ctx)
