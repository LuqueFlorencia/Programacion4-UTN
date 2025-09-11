// gato_ratones.js
// Versión mejorada manteniendo tu estructura de clases
// - Tablero 1..ancho, 1..altura
// - Gato (Tom) consume 1 de energía por celda/step y puede moverse en diagonal
// - Jerry se mueve al azar (4 u 8 direcciones)
// - El objetivo se elige por eficiencia (jules - costo_llegar)
// - Se usa distancia de Chebyshev para contar pasos con diagonales

function numAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -------------------- Entidades --------------------
class Tom {
  constructor(x0, y0, velocidad) {
    this.posicion = {
      x: x0 ?? 1, // por defecto 1..N
      y: y0 ?? 1,
    };
    this.energia = 60; // porcentaje/jules abstracto
    this.velocidad = velocidad ?? 5; // celdas por tick
    this.costoPorPaso = 1;
  }

  mover(proxMovimiento, limites) {
    console.log("Tom se mueve desde:", JSON.stringify(this.posicion));

    let pasosRestantes = this.velocidad;

    while (pasosRestantes > 0 && this.energia > 0) {
      const dx = Math.sign(proxMovimiento.x - this.posicion.x);
      const dy = Math.sign(proxMovimiento.y - this.posicion.y);

      // si ya está parado en destino, no sigas consumiendo
      if (dx === 0 && dy === 0) break;

      // permitir diagonales (muevo en ambos ejes a la vez)
      let nx = this.posicion.x + dx;
      let ny = this.posicion.y + dy;

      // clipeo a 1..N
      nx = Math.max(1, Math.min(limites.ancho, nx));
      ny = Math.max(1, Math.min(limites.altura, ny));

      // si realmente avanzó, cobro energía
      if (nx !== this.posicion.x || ny !== this.posicion.y) {
        this.posicion.x = nx;
        this.posicion.y = ny;
        this.energia -= this.costoPorPaso;
      }

      pasosRestantes--;
      if (this.energia <= 0) break;
    }

    console.log("Tom se mueve hasta:", JSON.stringify(this.posicion));
    console.log("A Tom le quedan:", this.energia, "puntos de energía.");
  }
}

class Jerry {
  constructor(nombre, x0, y0, velocidad) {
    this.posicion = {
      x: x0 ?? 1,
      y: y0 ?? 1,
    };
    this.nombre = nombre;
    this.energia = 10; // jules que gana Tom al comerlo
    this.velocidad = velocidad ?? 3; // celdas por tick
    this.usarDiagonales = true; // podés poner false si querés sólo 4 direcciones
  }

  movimientoAlAzar(tablero) {
    console.log(`Jerry ${this.nombre} se mueve desde: ${JSON.stringify(this.posicion)}`);

    let cont = this.velocidad;
    const dirs4 = [
      [0, 1], // arriba
      [1, 0], // derecha
      [0, -1], // abajo
      [-1, 0], // izquierda
    ];
    const dirsDiag = [
      [1, 1],
      [1, -1],
      [-1, 1],
      [-1, -1],
    ];
    const dirs = this.usarDiagonales ? dirs4.concat(dirsDiag) : dirs4;

    while (cont > 0) {
      const [dx, dy] = dirs[numAleatorio(0, dirs.length - 1)];
      const nx = this.posicion.x + dx;
      const ny = this.posicion.y + dy;

      if (tablero.esLugarDisponible(nx, ny)) {
        this.posicion.x = nx;
        this.posicion.y = ny;
        cont -= 1;
      } else {
        // si no es válido, reintenta otra dirección
        // (para evitar loops infinitos, reducí cont si querés que a veces "pierda" el paso)
      }
    }

    console.log(`Jerry ${this.nombre} se mueve hasta: ${JSON.stringify(this.posicion)}`);
  }
}

// -------------------- Tablero / Motor --------------------
class Tablero {
  constructor(altura, ancho) {
    // Usamos 1..N en ambos ejes
    this.altura = altura ?? 8;
    this.ancho = ancho ?? 8;
    this.tom = new Tom(1, 1, 5);
    this.jerrys = [];
    this.ronda = 0;
  }

  // Utilidades
  dentroDeLimites(x, y) {
    return x >= 1 && x <= this.ancho && y >= 1 && y <= this.altura;
  }

  distChebyshev(ax, ay, bx, by) {
    return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
  }

  // Metodos de estado
  dibujarTablero() {
    // dibujo simple en consola
    for (let y = this.altura; y >= 1; y--) {
      let linea = "";
      for (let x = 1; x <= this.ancho; x++) {
        const ocupadoPor = this.esOcupadoPor(x, y);
        if (ocupadoPor.isDisponible) {
          linea += "[ ]";
        } else {
          linea += ocupadoPor.ocupadoPor;
        }
      }
      console.log(linea);
    }
  }

  colocarTom(tom) {
    this.tom = tom;
  }

  colocarJerry(jerry) {
    this.jerrys.push(jerry);
  }

  obtenerTom() {
    return this.tom;
  }

  obtenerJerrys() {
    return this.jerrys;
  }

  obtenerDistancia(tom, jerry) {
    // Mantengo euclidiana si querés medir "metros"
    const dx = jerry.posicion.x - tom.posicion.x;
    const dy = jerry.posicion.y - tom.posicion.y;
    return Math.hypot(dx, dy);
  }

  // Selección por eficiencia = jules - (distChebyshev * costoPorPaso)
  obtenerProxJerry(tom) {
    let mejor = null;
    let mejorScore = -Infinity;

    for (const jerry of this.jerrys) {
      const dist = this.distChebyshev(
        tom.posicion.x,
        tom.posicion.y,
        jerry.posicion.x,
        jerry.posicion.y
      );
      const costo = dist * tom.costoPorPaso;
      const score = jerry.energia - costo;

      if (score > mejorScore) {
        mejorScore = score;
        mejor = { x: jerry.posicion.x, y: jerry.posicion.y };
      }
    }

    // fallback: si no hay jerrys
    return mejor ?? { x: tom.posicion.x, y: tom.posicion.y };
  }

  esFinJuego() {
    // Termina si Tom sin energía o si no quedan jerrys
    if (this.tom.energia <= 0) {
      console.log("Tom se quedó sin energías. Game Over!");
      return true;
    }
    if (this.jerrys.length <= 0) {
      console.log("Todos los Jerrys fueron devorados. ¡Congrats!");
      return true;
    }
    return false;
  }

  esJerryAtrapado() {
    // si coincide posición con Tom lo elimina y transfiere energía
    const tom = this.tom;
    for (let i = this.jerrys.length - 1; i >= 0; i--) {
      const jerry = this.jerrys[i];
      if (jerry.posicion.x === tom.posicion.x && jerry.posicion.y === tom.posicion.y) {
        tom.energia += jerry.energia;
        this.jerrys.splice(i, 1);
        console.log(
          `Jerry ${jerry.nombre} Eliminado en Posición: ${JSON.stringify(jerry.posicion)}`
        );
        console.log(`Tom ganó energía. Ahora tiene: ${tom.energia} puntos de energía.`);
      }
    }
  }

  // Ocupación y disponibilidad
  esOcupadoPor(x, y) {
    let isDisponible = true;
    let ocupadoPor = "";

    if (!this.dentroDeLimites(x, y)) {
      return { isDisponible: false, ocupadoPor: "[X]" }; // fuera del tablero
    }

    const tom = this.tom;
    if (x === tom.posicion.x && y === tom.posicion.y) {
      isDisponible = false;
      ocupadoPor = "[T]";
      return { isDisponible, ocupadoPor };
    }

    for (const j of this.jerrys) {
      if (x === j.posicion.x && y === j.posicion.y) {
        isDisponible = false;
        ocupadoPor = `[${j.nombre}]`;
        break;
      }
    }

    return { isDisponible, ocupadoPor };
  }

  esLugarDisponible(x, y) {
    if (!this.dentroDeLimites(x, y)) return false;
    const { isDisponible } = this.esOcupadoPor(x, y);
    return isDisponible;
  }
}

// -------------------- Demo --------------------
console.log("============== Nuevo Juego ==============");
const tablero = new Tablero(10, 10);

const tom = new Tom(1, 1, 5);
const jerry1 = new Jerry("1", 6, 9, 3);
const jerry2 = new Jerry("2", 5, 5, 3);
const jerry3 = new Jerry("3", 10, 10, 3);

tablero.colocarTom(tom);
tablero.colocarJerry(jerry1);
tablero.colocarJerry(jerry2);
tablero.colocarJerry(jerry3);

let cont = 1;
while (!tablero.esFinJuego()) {
  console.log(`============== Ronda ${cont} ==============`);
  tablero.dibujarTablero();

  // Mueven los jerrys primero (se desplazan)
  const jerrys = tablero.obtenerJerrys();
  for (const j of jerrys) {
    j.movimientoAlAzar(tablero);
    // podés dibujar después de cada uno si querés ver el paso a paso:
    // tablero.dibujarTablero();
  }

  // Tom calcula objetivo por eficiencia y se mueve hacia él
  const proximoMovimiento = tablero.obtenerProxJerry(tablero.obtenerTom());
  tablero.obtenerTom().mover(proximoMovimiento, { ancho: tablero.ancho, altura: tablero.altura });

  // Chequear atrapados
  tablero.esJerryAtrapado();

  // Mostrar tablero al cierre de ronda
  tablero.dibujarTablero();
  cont += 1;
}

console.log("============ Fin del Juego ==============");
