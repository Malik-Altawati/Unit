import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponentComponent } from './post-card-component.component';

describe('PostCardComponentComponent', () => {
  let component: PostCardComponentComponent;
  let fixture: ComponentFixture<PostCardComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCardComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
