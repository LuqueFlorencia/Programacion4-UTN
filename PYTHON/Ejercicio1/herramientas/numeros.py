def es_par(n:int) -> bool:
  return n % 2 == 0

def factorial(n:int) -> int:
  if n == 0:
    return 1
  return n*factorial(n-1)
