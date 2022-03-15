import { ComponentFixture } from '@angular/core/testing';

export const queryByTestId = <C>(
  fixture: ComponentFixture<C>,
  id: string
): HTMLElement =>
  fixture.debugElement.nativeElement.querySelector(`[data-testid="${id}"]`);

export const queryAllByTestId = <C>(
  fixture: ComponentFixture<C>,
  id: string
): HTMLElement[] =>
  fixture.debugElement.nativeElement.querySelectorAll(`[data-testid="${id}"]`);
