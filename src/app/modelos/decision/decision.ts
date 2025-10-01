export interface Decision {
    id : number,
    personajeId : number,
    descripcion : string,
    habilitada : boolean,
    frecuencia : number,
    unica : boolean,
    mostrar : boolean,
    // valoracion : number, //Por si nos pinta hacer moral (bien-mal) 
    efectos : [number, number, number, number]
}