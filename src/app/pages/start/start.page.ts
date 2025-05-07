import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StartCardComponent } from '../../components/start-card/start-card.component';

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, StartCardComponent],
})
export class StartPage {
  constructor() {}
}
