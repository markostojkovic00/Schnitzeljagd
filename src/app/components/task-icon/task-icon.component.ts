import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-icon',
  templateUrl: './task-icon.component.html',
  styleUrls: ['./task-icon.component.scss'],
})
export class TaskIconComponent {
  @Input() iconSrc!: string;
}
