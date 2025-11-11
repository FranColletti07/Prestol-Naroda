import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Personaje } from 'src/app/modelos/personaje/personaje';
@Injectable({
  providedIn: 'root'
})
export class Personajes {
  private personajeSubject = new BehaviorSubject<Personaje[]>([]);
  /*BehaviorSubject es un tipo de Observable de RxJS que:
  Almacena el estado actual del carrito (un array de objetos con personajes).
  Emite el valor actual a nuevos suscriptores (inicializado con un array vacío []). */
  personaje$ = this.personajeSubject.asObservable(); //Expone el BehaviorSubject como un Observable (para que otros componentes puedan suscribirse al carrito sin modificar su estado directamente).
  armarArregloPersonajes(personaje : Personaje){
      const personajes = this.personajeSubject.getValue();  // Obtiene el array actual
      this.personajeSubject.next([...personajes, personaje])
  }


  // agregarAlCarrito(producto: Producto) {
  //   const productos = this.carritoSubject.getValue();  // Obtiene el array actual
  //   const encontrado = productos.find(p => p.producto.id === producto.id); // Busca si el producto ya está
  //   if (encontrado) {
  //     encontrado.cantidad++;
  //   } else {
  //     this.carritoSubject.next([...productos, { producto, cantidad: 1 }])
  //   }
  //   /*Si el producto ya está en el carrito, aumenta su cantidad.
  //   Si no, lo agrega al array con cantidad 1 (usando el spread operator ... para mantener inmutabilidad).*/
  // }
  // eliminarDelCarrito(productoId: number) {
  //   const productos = this.carritoSubject.getValue().filter(p => p.producto.id !== productoId); //Filtra el array para excluir el producto con el id especificado.
  //   this.carritoSubject.next(productos);
  // }

  // vaciarCarrito() {
  //   this.carritoSubject.next([]);
  // }

  // actualizarCantidad(productoId: number, nuevaCantidad: number) {
  //   //recorremos el carrito y actualizamos la cantidad del producto con el id dado
  //   const productos = this.carritoSubject.getValue().map(item => {
  //     if (item.producto.id === productoId) {
  //       //retornamos una copia del producto con la nueva cantidad
  //       return { ...item, cantidad: nuevaCantidad };
  //     }
  //     return item;
  //   });
  //   // emitimos el nuevo estado del carrito
  //   this.carritoSubject.next(productos);
  // }

  // //Metodo para obtener los productos del carrito con un arreglo
  // obtenerProductos(): { producto: Producto; cantidad: number }[] {
  //   return this.carritoSubject.getValue();
  // }

  // //Metodo para calcular a pagar (precio * cantidad)

  // obtenerTotal(): number {
  //   const productos = this.carritoSubject.getValue();
  //   //Usamos reduce para sumar los subtotales de cada producto
  //   return productos.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  // }

  // generarTicket(){
  //   let contador = 0;
  //   let total = 0;
  //   let subtotal = [{nombre: "", precio: 0}];
  //   for(let producto of this.carritoSubject.getValue()){
  //     subtotal[contador].precio = (producto.producto.precio * producto.cantidad);
  //     subtotal[contador].nombre = producto.producto.nombre;
  //     total = subtotal[contador].precio + total;
  //     contador++;
  //   }
  //   document.write(`Subtotales: 
  //     `);
  // }
}
