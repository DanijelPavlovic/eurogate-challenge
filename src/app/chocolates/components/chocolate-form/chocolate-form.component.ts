import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Chocolate} from '../../models';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {ChocolatesService} from '../../services/chocolates.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-chocolate-form',
  imports: [
    FloatLabel,
    InputText,
    FormsModule,
    NgIf,
    NgClass,
    Button,
    ReactiveFormsModule
  ],
  template: `
    <div class="card flex flex-wrap justify-between items-center gap-2 sm:gap-4 w-full">

      <form *ngIf="form" [formGroup]="form" (ngSubmit)="submit()">
        <div class="flex flex-wrap gap-2 sm:gap-4 flex-grow">
          <div class="flex flex-col w-full sm:w-auto">
            <p-floatlabel variant="on">
              <input
                id="name"
                autocomplete="off"
                pInputText
                formControlName="name"
                required
                [ngClass]="{ 'ng-invalid': form.get('name')?.invalid && form.get('name')?.touched }"
              />
              <label for="name">Name</label>
            </p-floatlabel>
            <div *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
              <small class="text-red-500">Name is required.</small>
            </div>
          </div>

          <div class="flex flex-col w-full sm:w-auto">
            <p-floatlabel variant="on">
              <input
                id="brand"
                autocomplete="off"
                pInputText
                formControlName="brand"
                required
                [ngClass]="{ 'ng-invalid': form.get('brand')?.invalid && form.get('brand')?.touched }"
              />
              <label for="brand">Brand</label>
            </p-floatlabel>
            <div *ngIf="form.get('brand')?.invalid && form.get('brand')?.touched">
              <small class="text-red-500">Brand is required.</small>
            </div>
          </div>

          <div class="flex gap-2 items-end">
            <p-button icon="pi pi-check" type="submit" [rounded]="true" [text]="true"/>
            <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger" (click)="exitEdit.emit()"/>
          </div>
        </div>
      </form>
    </div>
  `,
})
export class ChocolateFormComponent implements OnInit {

  @Input() chocolate: Chocolate | undefined;
  @Output() exitEdit = new EventEmitter();
  @Output() updated = new EventEmitter<Chocolate>();

  _service: ChocolatesService = inject(ChocolatesService)
  _msgService: MessageService = inject(MessageService)
  _fb: FormBuilder = inject(FormBuilder)

  form: FormGroup | undefined

  ngOnInit(): void {
    if (this.chocolate) {
      this.form = this._fb.group({
        name: [this.chocolate.name, Validators.required],
        brand: [this.chocolate.brand, Validators.required],
      })
    }
  }

  submit(): void {
    this._service.updateChocolate(this.chocolate!.id, this.form!.value).subscribe({
      next: (response: Chocolate) => {
        this._msgService.add({
          severity: 'success',
          summary: 'Success',
          key: 'br',
          detail: 'Chocolate details updated',
        });
        this.updated.emit(response);
      },
      error: err => {
        console.log(err);
        this._msgService.add({
          severity: 'error',
          summary: 'Error',
          key: 'br',
          detail: 'Failed to update chocolate',
        });
      }
    })
  }
}
