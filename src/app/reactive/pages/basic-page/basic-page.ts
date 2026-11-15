import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  public myForm : FormGroup  = this.fb.group({
    // posicion #1 valor, posicion #2 validadores sincronos, posicion #3 validadores asinc
    name: ['',[Validators.required, Validators.minLength(3)], []],
    price: [0, [Validators.required, Validators.min(10)], []],
    inStorage: [0, [Validators.required, Validators.min(0)], []]
  });

  isValidField( fieldName: string) : boolean | null {
    return !!this.myForm.controls[fieldName].errors;
  }

  getFieldError(fieldName: string): string | null {
    // Si el campo no existe, retornamos null
    if (!this.myForm.controls[fieldName]) return null;
    // Creamos una constante que contenga los errores del campo, si no tiene errores retornamos un objeto vacio
    const errors = this.myForm.controls[fieldName].errors ?? {};
    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'this field is required.';
        case 'min':
          return `Minimum value of ${errors['min'].min}`;
        case 'minlength':
          return `Minimum of ${errors['minlength'].requiredLength} characters.`;
      }
    }
    return null;
  }

}
