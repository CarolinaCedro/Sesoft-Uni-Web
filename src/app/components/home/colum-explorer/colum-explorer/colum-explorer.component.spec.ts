import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumExplorerComponent } from './colum-explorer.component';

describe('ColumExplorerComponent', () => {
  let component: ColumExplorerComponent;
  let fixture: ComponentFixture<ColumExplorerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumExplorerComponent]
    });
    fixture = TestBed.createComponent(ColumExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
