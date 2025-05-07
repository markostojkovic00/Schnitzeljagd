import {Component, Input} from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonButton,
    RouterLink
  ]
})
export class StartCardComponent {
  @Input() name?: string;
}
