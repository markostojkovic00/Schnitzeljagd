import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private popSound = new Audio('assets/sounds/confettiPop.mp3');
  private applause = new Audio('assets/sounds/applause.mp3');

  playPop() {
    this.popSound.currentTime = 0;
    this.popSound.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  }

  playApplause() {
    this.applause.currentTime = 0;
    this.applause.play().catch((err) => {
      console.warn('Audio playback failed:', err);
    });
  }
}
