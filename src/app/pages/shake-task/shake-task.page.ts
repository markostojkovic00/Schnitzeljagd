import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeolocationTaskPage } from '../geolocation-task/geolocation-task.page';

@Component({
  selector: 'app-shake-task',
  templateUrl: './shake-task.page.html',
  styleUrls: ['./shake-task.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, GeolocationTaskPage],
})
export class ShakeTaskPage {
  constructor() {}
}
