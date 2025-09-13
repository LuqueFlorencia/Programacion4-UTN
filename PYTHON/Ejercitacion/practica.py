#VARIABLES
nombre = "Florencia"
edad = 30
altura = 1.75
activo = True
print(altura)

#CALCULOS
numero = "10"
suma= int(numero) +5
print (suma)

#LISTAS
lista = [10,20,30]
lista.append(40)
print(lista[0])

#CONDICIONALES
edad = 20
if edad >= 18:
  print ("Mayor")
elif edad ==17:
  print ("Casi mayor")
else:
  print ("Menor")

#CICLOS
for i in range(5):
  print(i)

x = 0
while x<5:
  print(x)
  x+=1

#FUNCIONES
def saludar (nombre:str)-> str:
  return f"Hola, {nombre}"
print (saludar ("Mauro"))



