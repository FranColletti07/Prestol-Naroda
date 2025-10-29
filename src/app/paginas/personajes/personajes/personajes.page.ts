import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Personajes } from 'src/app/servicios/personajes/personajes';
import { Personaje } from 'src/app/modelos/personaje/personaje';
@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.page.html',
  styleUrls: ['./personajes.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PersonajesPage implements OnInit {
  personajes: { personaje: Personaje }[] = [];
  constructor(private personajesService: Personajes) { }
  hacerAlgo() {

  }
  ngOnInit(): void {
    this.personajesService.personaje$.subscribe((personajes) => {
      this.personajes = personajes;
    });
  }

}
