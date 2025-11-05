import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPipelineComponent } from './lead-pipeline.component';

describe('LeadPipelineComponent', () => {
  let component: LeadPipelineComponent;
  let fixture: ComponentFixture<LeadPipelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadPipelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadPipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
