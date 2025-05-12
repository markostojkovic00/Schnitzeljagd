import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeConverterService {
  formatTime(milliseconds: number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return minutes === 0 ? `${seconds} Sek` : `${minutes} Min ${seconds} Sek`;
  }

  formatDurationHMS(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = this.padZero(Math.floor(totalSeconds / 3600));
    const minutes = this.padZero(Math.floor((totalSeconds % 3600) / 60));
    const seconds = this.padZero(totalSeconds % 60);

    return `${hours}:${minutes}:${seconds}`;
  }

  private padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }
}
