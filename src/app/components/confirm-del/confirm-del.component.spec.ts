import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDelComponent } from './confirm-del.component';

describe('ConfirmDelComponent', () => {
  let component: ConfirmDelComponent;
  let fixture: ComponentFixture<ConfirmDelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDelComponent]
    });
    fixture = TestBed.createComponent(ConfirmDelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
