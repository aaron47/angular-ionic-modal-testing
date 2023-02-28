import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { EmployeeState } from './employee.reducer';

export const selectEmployees = (state: AppState) => state.employees;
export const selectAllEmployees = createSelector(
  selectEmployees,
  (state: EmployeeState) => state.employees
);
