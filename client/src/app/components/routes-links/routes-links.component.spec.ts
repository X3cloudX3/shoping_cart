import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesLinksComponent } from './routes-links.component';

describe('RoutesLinksComponent', () => {
  let component: RoutesLinksComponent;
  let fixture: ComponentFixture<RoutesLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutesLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
