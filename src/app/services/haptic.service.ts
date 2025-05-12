import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Injectable({
  providedIn: 'root',
})
export class HapticService {
  async customHaptic(style: ImpactStyle) {
    await Haptics.impact({ style });
  }
}
