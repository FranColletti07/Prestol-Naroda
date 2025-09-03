import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinalesPage } from './finales.page';

describe('FinalesPage', () => {
  let component: FinalesPage;
  let fixture: ComponentFixture<FinalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
