import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
})
export class BasicPage {

  // Formularios Reactivos
  // Este es el primer adcercamiento pero si requerimos que el formulario
  // contenga informacion anidada eso e sun problema para usar
  // formularios reactivos con este metodo
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0)
  // });

  // METODO MEJOR
  private fb = inject(FormBuilder);
  public formUtils = FormUtils;
  public myForm : FormGroup  = this.fb.group({
    // posicion #1 valor, posicion #2 validadores sincronos, posicion #3 validadores asinc
    name: ['',[Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []]
  });

  onSave() : void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
