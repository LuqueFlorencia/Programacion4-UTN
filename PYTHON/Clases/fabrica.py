# Proyecto integrador: Fabrica de Galletas
# Clase Galleta con atributos basicos
# Clase GalletaRellena que hereda de Galleta
# Clase Almacen que recibe galleta y mantiene un inventario 
# Clase Notificador inyectada en Almacen para avisar cada vez que llega una galleta (puede ser EmailNotificador o SMSNotificador).

class Galleta:
    def __init__(self, nombre, forma = "redonda"):
        self.nombre = nombre
        self.forma = forma
    
    def hornear(self):
        print(f"{self.nombre} se hornea con forma {self.forma}")

class GalletaRellena(Galleta):
    def __init__(self, nombre, relleno, forma = "redonda"):
        super().__init__(nombre, forma)
        self.relleno = relleno
    
    def hornear(self):
        super().hornear()
        print(f"con relleno de {self.relleno}")

class Almacen:
    def __init__(self, nombre, notificador):
        self.nombre = nombre
        self.inventario = []
        self.notificador = notificador

    def recibir_galleta(self, galleta):
        self.inventario.append(galleta)
        self.notificador.enviar(f"{galleta.nombre} recibida en el almacen {self.nombre}")

class Notificador:
    def enviar(self, mensaje):
        raise NotImplementedError

class EmailNotificador(Notificador):
    def enviar(self, mensaje):
        print(f"Enviando email: {mensaje}")

class SMSNotificador(Notificador):
    def enviar(self, mensaje):
        print(f"Enviando SMS: {mensaje}")


# SIMULACION
almacen = Almacen("Almacen 1", EmailNotificador())
g1 = Galleta("Galleta Estrella", "estrella")
g1.hornear()

g2 = GalletaRellena("Galleta Rellena", "ddl")
g2.hornear()

almacen.recibir_galleta(g1)
almacen.recibir_galleta(g2)