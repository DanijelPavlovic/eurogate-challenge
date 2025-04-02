import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateDetailsComponent } from './chocolate-details.component';

describe('ChocolateDetailsComponent', () => {
  let component: ChocolateDetailsComponent;
  let fixture: ComponentFixture<ChocolateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolateDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChocolateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
