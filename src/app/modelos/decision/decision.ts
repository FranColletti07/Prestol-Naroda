export interface Decision {
    id : number,
    personajeId : number,
    decision : string,
    habilitada : boolean,
    frecuencia : number,
    unica : boolean,
    // valoracion : number, //Por si nos pinta hacer moral (bien-mal) 
    efectos : []
}