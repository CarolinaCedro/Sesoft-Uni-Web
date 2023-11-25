import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDialogContentComponent } from './upload-dialog-content.component';

describe('UploadDialogContentComponent', () => {
  let component: UploadDialogContentComponent;
  let fixture: ComponentFixture<UploadDialogContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadDialogContentComponent]
    });
    fixture = TestBed.createComponent(UploadDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
