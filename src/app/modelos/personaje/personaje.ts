export interface Personaje {
    id : number,
    nombre : string,
    descripcion : string,
    imagen : string,
    relacion : number,
    puesto : string,
    conocido : boolean,
    eventoId : [number] //clave foranea de evento
}