import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFoodComponent } from './board-food.component';

describe('BoardFoodComponent', () => {
  let component: BoardFoodComponent;
  let fixture: ComponentFixture<BoardFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardFoodComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
