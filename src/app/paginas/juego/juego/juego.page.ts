import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/modelos/personaje/personaje';
import { Decision } from 'src/app/modelos/decision/decision';
import { Eleccion } from 'src/app/servicios/eleccion/eleccion';
import { Personajes } from 'src/app/servicios/personajes/personajes';


@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class JuegoPage implements OnInit {
  estadisticas = [50, 50, 50, 50]; // Estadisticas inciales de la partida
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
      nombre: "Juan Carlos",
      descripcion: "SHAW, Guarana",
      imagen: "assets/jcarlos.jpeg",
      relacion: 0, // te cae mal
      puesto: "Secretario general",
      conocido: true, //Lo conoces
      eventoId: [1]
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
      mostrar: true,
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
      descripcion: "Trava lindo o mina fea",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: false,
      mostrar: false,
      opcion1: "Gran Idea",
      opcion2: "No creo que a la gente le guste la idea",
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) Podría ir en efectos perfectamente
      efectosOpcion1: [100, 100, 100, 100],
      efectosOpcion2: [100, 100, 100, 100]
    }
  ];
  constructor(private eleccionService: Eleccion, private personajeService: Personajes) { }

  decisionOpcion1(decision: Decision) {
    alert("Opcion 1, ID: " + decision.id);
    let indiceDecision = this.decisiones.findIndex(item => item.id === decision.id);
    let indicePersonaje = this.personajes.findIndex(item => item.id === decision.personajeId);
    for (let i = 0; i < 4; i++) {
      this.estadisticas[i] = this.estadisticas[i] + decision.efectosOpcion1[i];
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
    }

    //
    let mostrar = true;
    for (let i = 0; i < 4; i++) {
      if (this.estadisticas[i] <= 0) {
        this.final(i);
        mostrar = false;
      } else if (this.estadisticas[i] >= 100) {
        this.final(i + 4);
        mostrar = false;
      }
    }
    if (mostrar) {
      this.decisiones[indiceNuevaDecision].mostrar = true;
    }
  }

  decisionOpcion2(decision: Decision) {
    alert("Opcion 2, ID: " + decision.id);
    let indiceDecision = this.decisiones.findIndex(item => item.id === decision.id);
    if (decision) {
      for (let i = 0; i < 4; i++) {
        this.estadisticas[i] = this.estadisticas[i] + decision.efectosOpcion2[i];
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
      if (this.estadisticas[i] <= 0) {
        this.final(i);
        mostrar = false;
      } else if (this.estadisticas[i] >= 100) {
        this.final(i + 4);
        mostrar = false;
      }
    }
    if (mostrar) {
      this.decisiones[indiceNuevaDecision].mostrar = true;
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
      document.writeln("Gay over");
    } /*else if()){
     Todos los demás finales
     }*/
    document.writeln("Gay over");
  }

  ngOnInit() {
  }

}
