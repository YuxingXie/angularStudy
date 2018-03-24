import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseItemComponent } from './use-item.component';

describe('UseItemComponent', () => {
  let component: UseItemComponent;
  let fixture: ComponentFixture<UseItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
