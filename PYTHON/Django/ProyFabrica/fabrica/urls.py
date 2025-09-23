from django.urls import path
from . import views

urlpatterns = [
  path('saludar/', views.saludo, name='formulario_saludar'),
  path('tablas/<int:numero>/', views.tabla_multiplicar, name='tabla_multiplicar'),
  path('formulario/', views.formulario_tabla, name='formulario_tabla'),
  path('producto/<slug:codigo>', views.producto_detalle, name = 'producto_detalle')
]