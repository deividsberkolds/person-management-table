import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePersonModalComponent } from './update-person-modal.component';

describe('UpdatePersonModalComponent', () => {
  let component: UpdatePersonModalComponent;
  let fixture: ComponentFixture<UpdatePersonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePersonModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePersonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
