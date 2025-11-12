import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/modelos/personaje/personaje';
import { Decision } from 'src/app/modelos/decision/decision';
import { Eleccion } from 'src/app/servicios/eleccion/eleccion';
import { Personajes } from 'src/app/servicios/personajes/personajes';
import { Estadistica } from 'src/app/modelos/estadistica/estadistica';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class JuegoPage {
  estadisticas: Estadistica[] = [{
    id: 0,
    nombre: "Dinero",
    habilitada: true,
    estado: 50
  }, {
    id: 1,
    nombre: "Apoyo Popular",
    habilitada: true,
    estado: 50
  }, {
    id: 2,
    nombre: "Ejercito",
    habilitada: true,
    estado: 50
  }, {
    id: 3,
    nombre: "Recursos Naturales",
    habilitada: true,
    estado: 50
  }]; // Estadisticas inciales de la partida
  /*
  [0] = Dinero
  [1] = Apopyo popular
  [2] = Ejercito
  [3] = Recursos Naturales
   */
  personajes: Personaje[] = [
    {
      id: 0,
      nombre: "Carlos",
      descripcion: "Es carlos, un piola",
      imagen: "assets/pelusa.gif",
      relacion: 0, // te cae mal
      puesto: "Secretario general",
      conocido: false, //No Lo conoces
      eventoId: [1]
    },
    {
      id: 1,
      nombre: "Axel Klamm",
      descripcion: "Joven de orígenes humildes, es un arribista que llegó hasta donde está por su propio mérito, es peligroso darle mucho poder, pero no se lo puede ignorar.",
      imagen: "assets/Axel_Klamm.png",
      relacion: 0, // te cae mal
      puesto: "Secretario General del CRP",
      conocido: false, //Lo conoces
      eventoId: [1]
    },
    {
      id: 2,
      nombre: "El creador",
      descripcion: "Soy re fachero",
      imagen: "assets/pelusa.gif",
      relacion: 0, // te cae mal
      puesto: "El creador",
      conocido: false, //Lo conoces
      eventoId: [3]
    }
  ];
  decisiones: Decision[] = [
    {
      id: 0,
      personajeId: 0,
      descripcion: "Explotó un depósito de armas en la región de Príoshka, llovió metralla en un radio de 3km",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: false,
      mostrar: false,
      opcion1: "El ejército ayudará en la reconstrucción",
      opcion2: "Taparemos el escándalo",
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) Podría ir en efectos perfectamente
      efectosOpcion1: [5, 5, -20, 0],
      efectosOpcion2: [-15, 15, -5, -5]
    },
    {
      id: 1,
      personajeId: 0,
      descripcion: "Pienso que podríamos realizar una lotería nacional para estas navidades, si funciona bien podríamos recaudar muchos fondos",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: false,
      mostrar: false,
      opcion1: "Gran Idea",
      opcion2: "No creo que a la gente le guste la idea",
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) Podría ir en efectos perfectamente
      efectosOpcion1: [-30, 5, 5, 5],
      efectosOpcion2: [-5, -5, -5, -5]
    },
    {
      id: 2,
      personajeId: 1,
      descripcion: "",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: false,
      mostrar: false,
      opcion1: "Gran Idea",
      opcion2: "No creo que a la gente le guste la idea",
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) Podría ir en efectos perfectamente
      efectosOpcion1: [0, 0, 0, 0],
      efectosOpcion2: [0, 0, 0, 0]
    },
    {
      id: 3,
      personajeId: 2,
      descripcion: "Hola soy el creador",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: true,
      mostrar: true, //Siempre empieza por esta
      opcion1: "Ok",
      opcion2: "Tremendo",
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) Podría ir en efectos perfectamente
      efectosOpcion1: [0, 0, 0, 0],
      efectosOpcion2: [0, 0, 0, 0]
    }
  ];

  constructor(private eleccionService: Eleccion, private personajeService: Personajes) { }
  decisionOpcion1(decision: Decision) {
    alert("Has tomado una decision");
    let indiceDecision = this.decisiones.findIndex(item => item.id === decision.id);
    let indicePersonaje = this.personajes.findIndex(item => item.id === decision.personajeId);
    for (let i = 0; i < 4; i++) {
      this.estadisticas[i].estado = this.estadisticas[i].estado + decision.efectosOpcion1[i];
    }
    this.decisiones[indiceDecision].mostrar = false;
    if (decision.unica) {
      decision.habilitada = false;
    }

    //
    let indiceNuevaDecision = this.numeroAleatorio(0, (this.decisiones.length - 1));
    while ((indiceDecision === indiceNuevaDecision) || (this.decisiones[indiceNuevaDecision].habilitada == false)) {
      indiceNuevaDecision = this.numeroAleatorio(0, (this.decisiones.length - 1));
    };

    if (this.personajes[indicePersonaje].conocido === false) {
      this.personajes[indicePersonaje].conocido = true;
      this.personajeService.armarArregloPersonajes(this.personajes[indicePersonaje]);
    }

    let mostrar = true;
    for (let i = 0; i < 4; i++) {
      if (this.estadisticas[i].estado <= 0) {
        this.final(i);
        mostrar = false;
      } else if (this.estadisticas[i].estado >= 100) {
        this.final(i + 4);
        mostrar = false;
      }
    }
    if (mostrar) {
      this.decisiones[indiceNuevaDecision].mostrar = true;
    }
  }

  decisionOpcion2(decision: Decision) {
    alert("Has tomado una decisión");
    let indiceDecision = this.decisiones.findIndex(item => item.id === decision.id);
    let indicePersonaje = this.personajes.findIndex(item => item.id === decision.personajeId);
    if (decision) {
      for (let i = 0; i < 4; i++) {
        this.estadisticas[i].estado = this.estadisticas[i].estado + decision.efectosOpcion2[i];
      }
      this.decisiones[indiceDecision].mostrar = false;
      if (decision.unica) {
        decision.habilitada = false;
      }
    } else {
      alert("UUUUUIUUIUIUIUIUIUIU Error fatal");
    }
    let indiceNuevaDecision = this.numeroAleatorio(0, (this.decisiones.length - 1));
    while ((indiceDecision === indiceNuevaDecision) || (this.decisiones[indiceNuevaDecision].habilitada == false)) {
      indiceNuevaDecision = this.numeroAleatorio(0, (this.decisiones.length - 1));
    };
    let mostrar = true;
    for (let i = 0; i < 4; i++) {
      if (this.estadisticas[i].estado <= 0) {
        this.final(i);
        mostrar = false;
      } else if (this.estadisticas[i].estado >= 100) {
        this.final(i + 4);
        mostrar = false;
      }
    }
    if (mostrar) {
      this.decisiones[indiceNuevaDecision].mostrar = true;
    }
    if (this.personajes[indicePersonaje].conocido === false) {
      this.personajes[indicePersonaje].conocido = true;
      this.personajeService.armarArregloPersonajes(this.personajes[indicePersonaje]);
    }

  }

  numeroAleatorio(min: number, max: number) { // se incluye el minimo y el maximo
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /*
  id del final
  0 = llegó a 0 la plata
  1 = llegó a 0 el apoyo popular
  2 = llegó a 0 el ejercito
  3 = llegó a 0 los recursos naturales
  4 = llegó al 100 la plata
  5 = llegó a 100 el apoyo popular
  6 = llegó a 100 el ejercito
  7 = llegó a 100 los recursos naturales
  8 = final por tiempo bueno?
  9 = final por tiempo malo?
  */
  final(id: number) {
    if (id === 0) {
      alert("Te quedaste sin plata papito");
      document.writeln("Game over");
    } /*else if()){
     Todos los demás finales
     }*/
    document.writeln("Game over");
  }
}
