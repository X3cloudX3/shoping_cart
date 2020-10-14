import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPartTwoComponent } from './sign-up-part-two.component';

describe('SignUpPartTwoComponent', () => {
  let component: SignUpPartTwoComponent;
  let fixture: ComponentFixture<SignUpPartTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpPartTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
