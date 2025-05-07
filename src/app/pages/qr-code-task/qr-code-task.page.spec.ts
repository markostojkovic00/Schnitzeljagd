import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrCodeTaskPage } from './qr-code-task.page';

describe('QrCodeTaskPage', () => {
  let component: QrCodeTaskPage;
  let fixture: ComponentFixture<QrCodeTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
