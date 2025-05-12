import { Component, input } from '@angular/core';
import { IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle],
})
export class TaskComponent {
  title = input<string>('');
  subtitle = input<string>('');
}
