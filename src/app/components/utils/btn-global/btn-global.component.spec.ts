import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGlobalComponent } from './btn-global.component';

describe('BtnGlobalComponent', () => {
  let component: BtnGlobalComponent;
  let fixture: ComponentFixture<BtnGlobalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnGlobalComponent]
    });
    fixture = TestBed.createComponent(BtnGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
