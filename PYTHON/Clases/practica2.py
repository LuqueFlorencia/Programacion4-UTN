# Crea una clase Matematica con:
# Un método estático es_par(numero) que devuelva True si el número es par.
# Un método de clase que cuente cuántas veces se ha llamado a es_par.

class Matematica:
    _contador = 0

    @staticmethod
    def es_par(num):
        Matematica._contador += 1
        if num % 2 == 0:
            return True
        else:
            return False
        
    def obtener_cantidad_llamadas(self):
        return self._contador

math = Matematica()

print(math.es_par(4))
print(math.es_par(7))
print(math.es_par(10))

print(math.obtener_cantidad_llamadas())

print("-----------------------------------------------------------------")
# Atributos de clase vs atributos de instancia
# Crea una clase CuentaBancaria con atributo de clase tasa_interes = 0.05.
# Cada objeto tiene atributos titular y saldo.
# Demuestra la diferencia entre cambiar tasa_interes en la clase y cambiarla en un objeto.

class CuentaBancaria:
    tasa_interes = 0.05

    def __init__(self, titular, saldo):
        self.titular = titular
        self.saldo = saldo

cuenta1 = CuentaBancaria("Ana", 1000)
cuenta2 = CuentaBancaria("Juan", 2000)

print("1: ")
print(f"Tasa (cuenta1): {cuenta1.tasa_interes}")
print(f"Tasa (cuenta2): {cuenta2.tasa_interes}")
print(f"Tasa (clase): {CuentaBancaria.tasa_interes}")

CuentaBancaria.tasa_interes = 0.07

print("2: ")
print(f"Tasa (cuenta1): {cuenta1.tasa_interes}")
print(f"Tasa (cuenta2): {cuenta2.tasa_interes}")
print(f"Tasa (clase): {CuentaBancaria.tasa_interes}")

cuenta1.tasa_interes = 0.10

print("3: ")
print(f"Tasa (cuenta1): {cuenta1.tasa_interes}")
print(f"Tasa (cuenta2): {cuenta2.tasa_interes}")
print(f"Tasa (clase): {CuentaBancaria.tasa_interes}")

print("-----------------------------------------------------------------")
# Herencia múltiple
# Crea dos clases: Volador (con método volar()) y Nadador (con método nadar()).
# Crea una clase Pato que herede de ambas.
# Demuestra cómo puede volar y nadar.

class Volador():
    def volar(self):
        print(f"puede volar")

class Nadador():
    def nadar(self):
        print(f"puede nadar")

class Pato(Volador, Nadador):
    pass

pato = Pato()
pato.nadar()
pato.volar()

print("-----------------------------------------------------------------")
# Interfaces con abc
# Define una clase abstracta Figura con método abstracto calcular_area().
# Implementa Circulo, Rectangulo y Triangulo.
# Crea una lista de figuras y calcula el área de todas sin preguntar qué tipo son.

from abc import ABC, abstractmethod
import math

class Figura(ABC):
    @abstractmethod
    def calcular_area(self):
        pass

class Circulo(Figura):
    nombre = "Circulo"
    def __init__(self, radio):
        self.radio = radio

    def calcular_area(self):
        return math.pi * self.radio ** 2

class Rectangulo(Figura):
    nombre = "Rectangulo"
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura
    
    def calcular_area(self):
        return self.base * self.altura
    
class Triangulo(Figura):
    nombre = "Triangulo"
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura
    
    def calcular_area(self):
        return (self.base * self.altura) / 2
    

figuras = [
    Circulo(5),
    Rectangulo(4,6),
    Triangulo(3,7),
    Circulo(2.5)
]

for figura in figuras:
    area = figura.calcular_area()
    print(f"{figura.nombre} tiene un area de {area:.2f}")

print("-----------------------------------------------------------------")
