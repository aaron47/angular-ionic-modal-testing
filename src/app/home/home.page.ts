import { IonModal } from '@ionic/angular';
import { selectAllEmployees } from './../state/employee.selector';
import { AppState } from './../state/app.state';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addEmployee } from '../state/employee.actions';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  employee: FormGroup;
  employees$ = this.store.select(selectAllEmployees);
  showErrors = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>
  ) {
    this.employee = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      location: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (!this.employee.invalid) {
      this.modal.dismiss(null, 'confirm');
    }

    this.showErrors = true;
    return;
  }

  addEmployee(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;

    if (ev.detail.role === 'confirm') {
      if (!this.employee.invalid) {
        this.store.dispatch(
          addEmployee({
            employee: {
              id: Math.random().toString(36).substring(2),
              ...this.employee.value,
            },
          })
        );
        this.employee.reset();
      }
    }

    return;
  }
}
