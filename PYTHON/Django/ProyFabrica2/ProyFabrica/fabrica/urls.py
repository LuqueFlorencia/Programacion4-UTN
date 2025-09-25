from django.urls import path
from . import views

urlpatterns = [
    path('', views.saludo, name='saludo'),
    path('tablas/<int:numero>/', views.tabla_multiplicar, name='tabla_multiplicar'),
    path('formulario/', views.formulario_tabla, name='formulario_tabla'),
]
