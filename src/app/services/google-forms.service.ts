import { Injectable } from '@angular/core';
import { LeaderboardEntry } from '../models/LearderboardEntry';
import { TimeConverterService } from './time-converter.service';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root',
})
export class GoogleFormsService {
  private googleFormUrl =
    'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';

  constructor(private timeConverterService: TimeConverterService) {}

  async submitToGoogleForm(entry: LeaderboardEntry): Promise<void> {
    const name = entry.player.name;
    const schnitzel = entry.schnitzel;
    const potato = entry.potatoes;
    const duration = this.timeConverterService.formatDurationHMS(entry.time);

    const body = `entry.1860183935=${encodeURIComponent(name)}&entry.564282981=${schnitzel}&entry.1079317865=${potato}&entry.985590604=${encodeURIComponent(duration)}`;

    try {
      const response = await Http.request({
        method: 'POST',
        url: this.googleFormUrl,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: body,
      });
      console.log('Google Form submission response:', response);
    } catch (error) {
      console.error('Failed to submit to Google Form', error);
    }
  }
}
