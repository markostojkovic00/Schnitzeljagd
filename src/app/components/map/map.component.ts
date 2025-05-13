import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  readonly targetLat = 47.027585;
  readonly targetLng = 8.300941;

  map!: L.Map;
  userMarker?: L.CircleMarker;
  private watchId: string | null = null;

  async ngOnInit() {
    try {
      const { coords } = await Geolocation.getCurrentPosition();

      this.map = L.map('map').setView([this.targetLat, this.targetLng], 16);

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; OpenStreetMap &copy; <a href="https://carto.com/">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 20,
        }
      ).addTo(this.map);

      const markerIcon = L.icon({
        iconUrl: 'assets/icon/marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      L.marker([this.targetLat, this.targetLng], { icon: markerIcon })
        .addTo(this.map)
        .openPopup();

      this.userMarker = L.circleMarker([coords.latitude, coords.longitude], {
        radius: 8,
        color: 'blue',
        fillColor: '#3880ff',
        fillOpacity: 0.8,
      }).addTo(this.map);

      this.watchId = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          minimumUpdateInterval: 1000,
        },
        (position) => {
          if (!position?.coords) return;

          const { latitude, longitude } = position.coords;
          this.userMarker?.setLatLng([latitude, longitude]);
        }
      );
    } catch (err) {
      console.error('Error while fetching location:', err);
    }
  }

  async ngOnDestroy() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
    }
  }
}
