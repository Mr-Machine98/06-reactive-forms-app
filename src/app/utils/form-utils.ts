import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {

    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        console.log(errors);
        for (const e of Object.keys(errors)) {
            switch(e) {
                case 'required':
                    return 'This field is required.';
                case 'min':
                    return `Minimum value of ${errors['min'].min}`;
                case 'minlength':
                    return `Minimum of ${errors['minlength'].requiredLength} characters.`;
                case 'email':
                    return 'Invalid email format.';
                case 'pattern':
                    if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
                        return 'Invalid email pattern.';
                    }
                    return `Invalid format ${e}.`;
                default:
                    return `Invalid field ${e}.`;
            }
        }
        return null;
    }

    static isFieldOneEqualFieldTwo(field1: string, field2: string) {
        return (formGroup: AbstractControl) => {
        const field1Value = formGroup.get(field1)?.value;
        const field2Value = formGroup.get(field2)?.value;
        return field1Value === field2Value ? null : {passwordsNotEqual: true};
        }
    }
}