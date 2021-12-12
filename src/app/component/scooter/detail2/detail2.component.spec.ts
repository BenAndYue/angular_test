import { ComponentFixture, TestBed } from '@angular/core/testing';

import { detail2Component } from './detail2.component';

describe('detail2Component', () => {
  let component: detail2Component;
  let fixture: ComponentFixture<detail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ detail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(detail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
