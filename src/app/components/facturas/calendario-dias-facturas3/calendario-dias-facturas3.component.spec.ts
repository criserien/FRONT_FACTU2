/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CalendarioDiasFacturas3Component } from './calendario-dias-facturas3.component';

describe('CalendarioDiasFacturas3Component', () => {
  let component: CalendarioDiasFacturas3Component;
  let fixture: ComponentFixture<CalendarioDiasFacturas3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioDiasFacturas3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioDiasFacturas3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
