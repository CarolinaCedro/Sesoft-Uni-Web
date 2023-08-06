import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPostComponent } from './modal-post.component';

describe('ModalPostComponent', () => {
  let component: ModalPostComponent;
  let fixture: ComponentFixture<ModalPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPostComponent]
    });
    fixture = TestBed.createComponent(ModalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
