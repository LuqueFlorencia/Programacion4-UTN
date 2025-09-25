from django.shortcuts import render
from django.http import HttpResponse

def saludo(request):
    nombre = "Placido"
    return HttpResponse(f"<h1> Hola, {nombre}. Bienvenido a tu primer proyecto Django.<h1>")



def tabla_multiplicar(request, numero):
    try:
        n = int(numero)
    except ValueError:
        return HttpResponse("Por favor, ingrese un número válido.")

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

    return render(request, 'fabrica/tabla_formulario.html', {
        'numero': numero,
        'resultado': resultado
    })

