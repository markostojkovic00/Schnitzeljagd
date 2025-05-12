import { Component, Input } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle],
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
