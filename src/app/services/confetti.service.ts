import { inject, Injectable } from '@angular/core';
import confetti from 'canvas-confetti';
import { AudioService } from './audio.service';

@Injectable({
  providedIn: 'root',
})
export class ConfettiService {
  private audioService = inject(AudioService);

  celebrate() {
    this.audioService.playPop();
    const end = Date.now() + 500;
    function frame() {
      confetti({
        startVelocity: 70,
        particleCount: 4,
        angle: 80,
        spread: 60,
        origin: { x: 0, y: 1 },
      });
      confetti({
        startVelocity: 68,
        particleCount: 4,
        angle: 101,
        spread: 60,
        origin: { x: 1, y: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  celebrateWin() {
    this.audioService.playApplause();
    const duration = 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }
}
