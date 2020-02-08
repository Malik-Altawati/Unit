import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePostsSectionComponent } from './user-profile-posts-section.component';

describe('UserProfilePostsSectionComponent', () => {
  let component: UserProfilePostsSectionComponent;
  let fixture: ComponentFixture<UserProfilePostsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfilePostsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilePostsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
