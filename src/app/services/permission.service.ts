import { Injectable } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  async requestCameraPermissions() {
    const permission = await Camera.requestPermissions({
      permissions: ['camera'],
    });
    return permission.camera;
  }

  async checkCameraPermissions() {
    const permission = await Camera.checkPermissions();
    return permission.camera;
  }

  async requestGeolocationPermissions() {
    const permission = await Geolocation.requestPermissions({
      permissions: ['location'],
    });
    return permission.location;
  }

  async checkGeolocationPermissions() {
    const permission = await Geolocation.checkPermissions();
    return permission.location;
  }

  constructor() {}
}
