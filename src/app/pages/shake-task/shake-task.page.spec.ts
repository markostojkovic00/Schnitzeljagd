import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShakeTaskPage } from './shake-task.page';

describe('ShakeTaskPage', () => {
  let component: ShakeTaskPage;
  let fixture: ComponentFixture<ShakeTaskPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeTaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
