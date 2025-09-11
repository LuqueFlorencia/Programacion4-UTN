function numAleatorio(min,max) {
    return Math.floor(Math.random()*(max - min + 1)) + min
}

class Tom {
    constructor( x0, y0, velocidad ) {
        this.posicion = {
            x: x0 ? x0 : 0,
            y: y0 ? y0 : 0
        }
        this.energia = 60;
        this.velocidad = velocidad ? velocidad : 5
    }

    mover(proxMovimiento){
        console.log('Tom se mueve desde: '+JSON.stringify(this.posicion));
        for (let i = 0; i < (this.velocidad); i++) {
            if (this.energia >= this.velocidad*2){
                if (this.posicion.x > proxMovimiento.x){
                    this.posicion.x -= 1
                    this.energia -= this.velocidad*2 
                }
                if (this.posicion.x < proxMovimiento.x){
                    this.posicion.x += 1
                    this.energia -= this.velocidad*2
                }
                if (this.posicion.y > proxMovimiento.y){
                    this.posicion.y -= 1
                    this.energia -= this.velocidad*2 
                }
                if (this.posicion.y < proxMovimiento.y){
                    this.posicion.y += 1
                    this.energia -= this.velocidad*2
                }
            }
        }
        console.log('Tom se mueve hasta: '+JSON.stringify(this.posicion));
        console.log('a Tom le quedan: '+this.energia +' puntos de energia.');
    }
}
class Jerry {
    constructor(nombre,x0, y0, velocidad) {
        this.posicion = {
            x: x0 ? x0 : 0,
            y: y0 ? y0 : 0
        }
        this.nombre = nombre
        this.energia = 10
        this.velocidad = velocidad ? velocidad : 3;       
    }
    movimientoAlAzar(tablero ){
        console.log('Jerry se mueve desde: '+JSON.stringify(this.posicion));
        
        let cont =  this.velocidad
        let tableroAltura = tablero.altura
        let tableroAncho = tablero.ancho
        while (cont > 0 ){
            let direccion = numAleatorio(1,4)
            switch (direccion) {
                //arriba
                case 1:
                    if (!this.posicion.y == tableroAltura && tablero.esLugarDisponible(this.posicion.x,this.posicion.y+1)) {
                        this.posicion.y += 1
                        cont -= 1
                    }else{
                        //console.log('borde arriba')
                    }
                    break;
                //derecha
                case 2:
                    if (!this.posicion.x == tableroAncho && tablero.esLugarDisponible(this.posicion.x+1,this.posicion.y)){
                        this.posicion.x += 1
                        cont -= 1                       
                    }else{
                        //console.log('borde derecha')
                    }
                    break;
                //abajo
                case 3:
                    if (!this.posicion.y == 0 && tablero.esLugarDisponible(this.posicion.x,this.posicion.y-1)){
                        this.posicion.y -= 1
                        cont -= 1                        
                    }else{
                        //console.log('borde abajo')
                    }
                    break;
                //izquierda
                case 4:
                    if (!this.posicion.x == 0 && tablero.esLugarDisponible(this.posicion.x-1,this.posicion.y)){
                        this.posicion.x -= 1
                        cont -= 1
                    }else{
                        //console.log('borde izquierda')
                    }
                    break;
            }
            
        }
        console.log('Jerry se mueve hasta: '+JSON.stringify(this.posicion));
         

    }
}
class Tablero {
    constructor( altura, ancho) {
        this.altura = altura ? altura : 8
        this.ancho = ancho ? ancho : 8
        this.tom = new Tom()
        this.jerrys = []
    }

    //Metodos
    dibujarTablero(){
        for (let y = 1; y <= this.altura; y++) {
            let linea = ''
            for (let x = 1; x <= this.ancho; x++) {
                let ocupadoPor = this.esOcupadoPor(x,y)               
                if (ocupadoPor.isDisponible){
                    linea += '[ ]'
                }else{
                    linea += ocupadoPor.ocupadoPor
                }
            }   
            console.log(linea);
                     
        }
    }
    colocarTom(tom){
        this.tom = tom
    }
    colocarJerry(jerry){
        this.jerrys.push(jerry)
    }
    obtenerTom(){
        return this.tom
    }
    obtenerJerrys(){
        return this.jerrys
    }
    obtenerDistancia(tom, jerry){
        let dx = jerry.posicion.x - tom.posicion.x
        let dy = jerry.posicion.y- tom.posicion.y
        let distancia = Math.hypot(dx,dy);
        return distancia
    }
    obtenerProxJerry(tom){
        //dado la posicion de Tom determinar el Jerry mas cercano
        let posProxJerry = {x:0,y:0}
        let jerrys = this.jerrys
        let minDistancia = 99999999
        for (let i = 0; i < jerrys.length; i++) {
            let jerry = jerrys[i]
            let distancia = this.obtenerDistancia(tom,jerry)
            if (distancia < minDistancia){
                minDistancia = distancia
                posProxJerry = {x:jerry.posicion.x, y:jerry.posicion.y}
            }
             
        }
        return posProxJerry
    }
    esFinJuego(){
        //si el tom llego a 0 o si no hay mas jerrys pa comer
        let esFin = false
        if (this.tom.energia <= 0){
            esFin = true
            console.log("Tom se quedo sin energias. Game Over!");
            
        }
        if (this.jerrys.length <= 0){
            esFin = true
            console.log("Todos los Jerrys fueron devorados. Congrats!!!");   
        }
        return esFin
    }
    esJerryAtrapado(){
        //si hay match en la posicion del gato con un raton y lo elimina
        let jerrys = this.jerrys
        let tom = this.tom
        for (let i = 0; i < jerrys.length; i++) {
            let jerry = jerrys[i];
            if (jerry.posicion.x == tom.posicion.x && jerry.posicion.y == tom.posicion.y ){
                this.tom.energia += jerry.energia
                let indexEliminar = this.jerrys.indexOf(jerry)
                this.jerrys.splice(indexEliminar,1)
                console.log('Jerry '+jerry.nombre+' Eliminado en Posicion: '+JSON.stringify(jerry.posicion));
                console.log('Tom ganó energia. Ahora tiene : '+tom.energia +' puntos de energia.');
                
            }
        } 
    }
    esOcupadoPor(x,y){
        //si la posicion esta ocupado y por quien es ocupado
        let jerrys = this.jerrys
        let tom = this.tom
        let isDisponible = true
        let ocupadoPor = ''
        if (x > this.ancho || x < 0){
            isDisponible = false
        }
        if (y > this.altura || y < 0){
            isDisponible = false
        }
        if (x == tom.posicion.x && y == tom.posicion.y){
            isDisponible = false
            ocupadoPor = '[T]'
        }
        for (let i = 0; i < jerrys.length; i++) {
            let jerry = jerrys[i]
            if (x == jerry.posicion.x && y == jerry.posicion.y){
                isDisponible = false
                ocupadoPor = '['+jerry.nombre+']'
                break
            }
            
        }
        return {isDisponible,ocupadoPor}
    }
    esLugarDisponible(x,y){
        //si la posicion recibida esta disponible para moverse, tambien retorna porquien es ocupado
        let jerrys = this.jerrys
        let tom = this.tom
        let isDisponible = true
        if (x > this.ancho || x < 0){
            isDisponible = false
        }
        if (y > this.altura || y < 0){
            isDisponible = false
        }
        if (x == tom.posicion.x && y == tom.posicion.y){
            isDisponible = false
        }
        for (let i = 0; i < jerrys.length; i++) {
            let jerry = jerrys[i]
            if (x == jerry.posicion.x && y == jerry.posicion.y){
                isDisponible = false
                break
            }
            
        }
        return isDisponible
    }
}

console.log('============== Nuevo Juego ==============');
let tablero = new Tablero(10,10)
let tom = new Tom(1,1,5)
let jerry1 = new Jerry("1",6,9,3)
let jerry2 = new Jerry("2",5,5,3)
let jerry3 = new Jerry("3",10,10,3)
tablero.colocarTom(tom)
tablero.colocarJerry(jerry1)
tablero.colocarJerry(jerry2)
tablero.colocarJerry(jerry3)
let cont = 1
while (!tablero.esFinJuego()){
    console.log('============== Ronda '+cont+' ==============');
    tablero.dibujarTablero()
    let jerrys = tablero.obtenerJerrys()
    let tableroTom = tablero.obtenerTom()
    for (let i = 0; i < jerrys.length; i++) {
        let jerry = jerrys[i];
        jerry.movimientoAlAzar(tablero)
        tablero.dibujarTablero()
    }
    let proximoMovimiento = tablero.obtenerProxJerry(tableroTom)
    tableroTom.mover(proximoMovimiento)
    tablero.dibujarTablero()
    tablero.esJerryAtrapado()

    cont += 1
}


console.log('============ Fin del Juego ==============')