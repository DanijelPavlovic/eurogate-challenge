import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateFormComponent } from './chocolate-form.component';

describe('ChocolateFormComponent', () => {
  let component: ChocolateFormComponent;
  let fixture: ComponentFixture<ChocolateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolateFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChocolateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
