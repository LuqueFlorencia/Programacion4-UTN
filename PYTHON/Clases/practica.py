# Clase básica con atributos
# Metodos de una clase
# Encapsulamiento
class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.__edad = edad

    def presentarse(self):
        return f"Hola, me llamo {self.nombre} y tengo {self.__edad} años."
    
    def get_edad(self):
        return self.__edad

p1 = Persona("Juan", 25)
p2 = Persona("Ana", 30)

#print(p1.nombre, p1.edad)
print (p1.presentarse())
print (p1.get_edad())

#print(p2.nombre, p2.edad)
print (p2.presentarse())
print (p2.get_edad())

print("-----------------------------------------------------------------")
# Clase con constructor con valores por defecto
class Producto:
    def __init__(self, nombre, precio, stock = 0):
        self.nombre = nombre
        self.precio = precio
        self.stock = stock

    def comprar(self, cantidad):
        if cantidad <= self.stock:
            self.stock -= cantidad
            return f"Compra exitosa. Stock restante: {self.stock}"
        else:
            return "Stock insuficiente"
    
prod1 = Producto("Mesa", 10)
prod2 = Producto("Silla", 5, 10)

print(prod1.nombre, prod1.precio, prod1.stock)
print(prod1.comprar(1))

print(prod2.nombre, prod2.precio, prod2.stock)
print(prod2.comprar(5))

print("-----------------------------------------------------------------")
# Herencia simple
class Animal:
    def hacer_sonido(self):
        print("Sonido generico")

class Perro(Animal):
    def hacer_sonido(self):
        print("Guau")

class Gato(Animal):
    def hacer_sonido(self):
        print("Miau")

animales = [Animal(), Perro(), Gato()]
for a in animales:
    a.hacer_sonido()

print("-----------------------------------------------------------------")
# Herencia con super()
# Composicion de objetos (dependencias simples)
class Motor:
    def encender(self):
        print("Motor encendido")

class Vehiculo:
    def __init__(self, vel_max):
        self.vel_max = vel_max

class Auto(Vehiculo):
    def __init__(self, vel_max, color, motor):
        super().__init__(vel_max)
        self.color = color
        self.motor = motor
    
    def arrancar(self):
        self.motor.encender()
        print("El auto ha arrancado")

motor = Motor()
auto = Auto(180, "Rojo", motor)
print(auto.color, auto.vel_max)
auto.arrancar()

print("-----------------------------------------------------------------")
# Inyeccion de dependencias basica
class Notificador:
    def enviar(self, mensaje):
        raise NotImplementedError

class EmailNotificador(Notificador):
    def enviar(self, mensaje):
        print(f"Enviando email: {mensaje}")

class SMSNotificador(Notificador):
    def enviar(self, mensaje):
        print(f"Enviando SMS: {mensaje}")

class Usuario:
    def __init__(self, nombre, notificador: Notificador):
        self.nombre = nombre
        self.notificador = notificador

    def notificar(self, mensaje):
        self.notificador.enviar(f"Hola {self.nombre}, {mensaje}")

u1 = Usuario("Laura", EmailNotificador())
u1.notificar("tienes un nuevo mensaje")

u2 = Usuario("Pedro", SMSNotificador())
u2.notificar("tu pedido esta en camino")

print("-----------------------------------------------------------------")
# Inyeccion de dependencias avanzada
class Pago:
    def pagar(self, monto):
        raise NotImplementedError
    
class PagoTarjeta(Pago):
    def pagar(self, monto):
        print(f"Pagando ${monto} con tarjeta.")

class PagoEfectivo(Pago):
    def pagar(self, monto):
        print(f"Pagando ${monto} con efectivo.")

class Carrito:
    def __init__(self, metodo_pago: Pago):
        self.productos = []
        self.metodo_pago = metodo_pago

    def agregar(self, producto, precio):
        self.productos.append((producto, precio))

    def checkout(self):
        total = sum(precio for _, precio in self.productos)
        self.metodo_pago.pagar(total)

c1 = Carrito(PagoTarjeta())
c1.agregar("Libro", 20)
c1.agregar("Lapiz", 5)
c1.checkout()

c2 = Carrito(PagoEfectivo())
c2.agregar("Libro", 20)
c2.agregar("Lapiz", 5)
c2.checkout()
