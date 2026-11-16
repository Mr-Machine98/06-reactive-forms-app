import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {

    static isValidField(form: FormGroup, fieldName: string) : boolean | null {
        return (
            !!form.controls[fieldName].errors 
            && 
            form.controls[fieldName].touched
        );
    }

    static isValidFieldInArray(formArray: FormArray, index: number) {
        return (
        formArray.controls[index].errors
            &&
        formArray.controls[index].touched
        );
    }
    
    static getFieldError(form: FormGroup, fieldName: string): string | null {
        // Si el campo no existe, retornamos null
        if (!form.controls[fieldName]) return null;
        // Creamos una constante que contenga los errores del campo, si no tiene errores retornamos un objeto vacio
        const errors = form.controls[fieldName].errors ?? {};
        return FormUtils.getTextErrors(errors);
    }

    static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
        if (!formArray.controls[index]) return null;
        const errors = formArray.controls[index].errors ?? {}
        return FormUtils.getTextErrors(errors);
    }

    static getTextErrors(errors: ValidationErrors | null) : string | null {
        if (!errors) return null;
        for (const e of Object.keys(errors)) {
            switch(e) {
                case 'required':
                    return 'This field is required.';
                case 'min':
                    return `Minimum value of ${errors['min'].min}`;
                case 'minlength':
                    return `Minimum of ${errors['minlength'].requiredLength} characters.`;
            }
        }
        return null;
    } 
}