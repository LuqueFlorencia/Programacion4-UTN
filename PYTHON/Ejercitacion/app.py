from tabla_multiplicar import tabla
import random

def menu():
  print(" > MENU PARA TABLA DE MULTIPLICAR < ")
  print("Opcion 1: Ingresar numero por teclado.")
  print("Opcion 2: Generar numero aleatorio.")
  print("Otro: Salir")


x = "s"
while x == "s":
  menu()
  opcion = input("Opcion seleccionada: ")
  if opcion == "1":
    entrada = input("Ingrese un numero entero: ")
    if entrada.isdigit():
      num = int(entrada)
      if num > 0 and num < 11:
        print("TABLA: ")
        tabla(num)
      else:
        print ("Entrada invalida. El numero ingresado no se encuentra dentro del intervalo.")
    else:
        print ("Entrada invalida. Debe ser un numero entero.")
  elif opcion == "2":
    num2 = random.randint(1,10)
    print (f"Numero aleatorio {num2}: ")
    print("TABLA: ")
    tabla(num2)
  else:
    print ("Opcion ingresada invalida.")

  x = input("Desea realizar otra tabla? s/n: ")

print("FIN")





