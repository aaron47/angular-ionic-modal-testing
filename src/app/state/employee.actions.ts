import { createAction, props } from '@ngrx/store';
import { Employee } from '../shared/employee';

export const addEmployee = createAction(
  '[Employee Component] Add Employee',
  props<{ employee: Employee }>()
);

export const deleteEmployee = createAction(
  '[Employee Component] Delete Employee',
  props<{ id: string }>()
);
