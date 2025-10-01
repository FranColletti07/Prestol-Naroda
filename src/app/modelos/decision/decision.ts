export interface Decision {
    id : number,
    personajeId : number,
    descripcion : string,
    habilitada : boolean,
    frecuencia : number,
    unica : boolean,
    mostrar : boolean,
    opcion1 : string,
    opcion2 : string,
    // valoracion : number, //Por si nos pinta hacer moral (bien-mal) 
    efectosOpcion1 : [number, number, number, number],
    efectosOpcion2 : [number, number, number, number]
}