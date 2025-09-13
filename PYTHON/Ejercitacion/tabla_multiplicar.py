#TABLA DE MULTIPLICAR
def tabla (numero:int)-> str:
  resultado = 0
  for i in range(11):
    resultado = i * numero
    #print (numero, " * ", i, " = ", resultado)
  return f"= {resultado}"