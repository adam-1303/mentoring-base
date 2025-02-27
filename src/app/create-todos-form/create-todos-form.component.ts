import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatLabel } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


export function completedValidator(): ValidatorFn{
   return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value?.trim().toLowerCase();
      if (value === 'да' || value === 'нет') {
         return null
      }
      return { invalidCompleted: true};
   }
}

@Component({
   selector: 'app-create-todos-form',
   templateUrl: './create-todos-form.component.html',
   styleUrl: './create-todos-form.component.scss',
   standalone: true,
   imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule,MatLabel,MatSelectModule],
   changeDetection: ChangeDetectionStrategy.OnPush})

   
export class CreateTodosFormComponent {
   @Output()
   createTodos = new EventEmitter();
   
   public form = new FormGroup({
         "userId": new FormControl('', [Validators.required, Validators.minLength(3)]),
         "title": new FormControl('', [Validators.required]),
         "completed": new FormControl('', [Validators.required, completedValidator()]),
   });

   private getCompletedValue(): boolean {
      const value = this.form.get('completed')?.value!.trim().toLowerCase();
      if (value === 'да')
         return true;
      else return false;
   }

   public submitForm(): void{
      this.createTodos.emit({...this.form.value, completed: this.getCompletedValue()});
      this.form.reset();
      }
   }