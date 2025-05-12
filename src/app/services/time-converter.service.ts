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
}
