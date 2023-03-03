import { addEmployee, deleteEmployee } from './employee.actions';
import { createReducer, on } from '@ngrx/store';
import { Employee } from '../shared/employee';

export interface EmployeeState {
  employees: Employee[];
}

export const initialState: EmployeeState = {
  employees: [
    {
      id: '1',
      name: 'John Doe',
      age: 25,
      location: 'New York',
      salary: 50000,
      position: 'Software Engineer',
    },
  ],
};

export const employeeReducer = createReducer(
  initialState,
  on(addEmployee, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
  })),

  on(deleteEmployee, (state, { id }) => ({
    ...state,
    employees: state.employees.filter((employee) => employee.id !== id),
  }))
);
