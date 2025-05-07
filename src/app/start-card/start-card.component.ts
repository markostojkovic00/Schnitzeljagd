import {Component, Input} from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from "@ionic/angular/standalone";

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonButton
  ]
})
export class StartCardComponent {
  @Input() name?: string;
}
