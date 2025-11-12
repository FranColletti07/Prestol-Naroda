import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Personajes } from 'src/app/servicios/personajes/personajes';
import { Personaje } from 'src/app/modelos/personaje/personaje';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonContent, IonHeader, IonTitle, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard]
})
export class PersonajesPage implements OnInit {
  personajes: Personaje [] = [];
  constructor(private personajesService: Personajes) { }
  cargarPersonaje(personajes : Personaje[]) {
    
  }
  ngOnInit(): void {
    this.personajesService.personaje$.subscribe((personajes) => {
      this.personajes = personajes;
    });
  }

}
