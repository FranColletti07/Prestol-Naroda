import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterOutlet, RouterLink, IonButton],
})
export class HomePage {
  constructor() {}
}
