import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { Personaje } from 'src/app/modelos/personaje/personaje';
import { Decision } from 'src/app/modelos/decision/decision';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.page.html',
  styleUrls: ['./juego.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class JuegoPage implements OnInit {

  personajes: Personaje[] = [
    {
      id: 1,
      nombre: "Carlos",
      descripcion: "Es carlos, un piola",
      imagen: "una/url.jpg",
      relacion: 0, // te cae mal
      puesto: "Secretario general",
      conocido: false, //Lo conoces
      eventoId: [1]
    },
    {
      id: 2,
      nombre: "Juan Carlos",
      descripcion: "SHAW, Guarana",
      imagen: "una/url.jpg",
      relacion: 0, // te cae mal
      puesto: "Secretario general",
      conocido: true, //Lo conoces
      eventoId: [1]
    }
  ];
  decisiones : Decision[] = [
    {
      id: 1,
      personajeId: 1,
      descripcion: "Explotó un depósito de armas en la región de Príoshka, llovió metralla en un radio de 3km",
      habilitada: true,
      frecuencia: 10, //Normal
      unica: false,
      mostrar: true,
      // valoracion : number, //Por si nos pinta hacer moral (bien-mal) 
      efectos: [5, 5, 5, 5]
    }];
  constructor() { }

  decisionAceptada(){
    alert("Aceptado");
  }
  decisionRechazada(){
    alert("Rechazado");
  }
  ngOnInit() {
  }

}
