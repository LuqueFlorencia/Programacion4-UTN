def contar_palabras (texto:str) -> int:
  return len(texto.split())

def invertir(texto:str)->str:
  return texto[::-1]

def contar_repetidos(texto: str) -> list[tuple[str, int]]:
  palabras = texto.lower().split()
  resultado = []
  usadas = []
  for palabra in palabras:
    if palabra not in usadas:
      usadas.append(palabra)
      contador = 0
      for p in palabras:
        if p == palabra:
          contador += 1
      resultado.append((palabra, contador))
  
  return resultado

def starts_with (texto:str, letra:str) -> bool:
  return texto.starts_withs(letra)

#agrupar palabras con la misma cantidad de letras
def contar_cantidades(texto: str) -> list[tuple[str, int]]:
  palabras = texto.lower().split()
  resultado = []
  usadas = []
  cantidades = []

  for palabra in palabras:
    if palabra not in usadas:
      usadas.append(palabra)
      contador = 0
      for p in palabras:
        if p == palabra:
          contador += 1

      resultado.append((palabra, contador))
      cantidades.append(contador)
  
  for r in resultado:
    