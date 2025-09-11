##
datos = [
    ("Juan", 10),
    ("Juan", 6),
    ("Juan", 3),
    ("Ana", 5),
    ("Ana", 7),
    ("Ana", 8),
    ("Luis", 5),
    ("Luis", 8),
    ("Luis", 3),
]

alumnos = set(alumno for alumno, _ in datos)
print (alumnos)


def promedio(lista_notas):
    return sum(lista_notas) / len(lista_notas) if lista_notas else 0

alumnos = {alumno for alumno, _ in datos}

nota_alumno = {
    a: [nota for alumno, nota in datos if alumno == a]
    for a in alumnos
}

promedios = {a: promedio(notas) for a, notas in nota_alumno.items()}

print(promedios)