import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarOnesComponent } from './similar-ones.component';

describe('SimilarOnesComponent', () => {
  let component: SimilarOnesComponent;
  let fixture: ComponentFixture<SimilarOnesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimilarOnesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarOnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
