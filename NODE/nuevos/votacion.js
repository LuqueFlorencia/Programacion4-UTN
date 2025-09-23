/* Sistema de Votación
Hay candidatos y votantes.
Cada votante puede votar una sola vez.
El sistema debe registrar cada voto con: fecha, hora, votante y candidato elegido.
👉 Calcular: ganador, porcentaje de votos y detectar votos duplicados.*/ 


function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
  // Expected output: "resolved"
}

asyncCall();
