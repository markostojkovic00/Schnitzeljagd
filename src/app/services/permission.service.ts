import { Injectable } from '@angular/core';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { App } from '@capacitor/app';
import { AppLauncher } from '@capacitor/app-launcher';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  async arePermissionsGranted() {
    const cameraPermissions = await this.checkCameraPermissions();
    const geolocationPermissions = await this.checkGeolocationPermissions();
    return (
      cameraPermissions === 'granted' && geolocationPermissions === 'granted'
    );
  }

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

  async openPermissionSettings() {
    const { id } = await App.getInfo();
    await AppLauncher.openUrl({
      url: `App-prefs:${id}`,
    });
  }

  constructor() {}
}
