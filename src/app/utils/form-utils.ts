import { FormGroup } from '@angular/forms';
export class FormUtils {
    static isValidField(form: FormGroup, fieldName: string) : boolean | null {
        return (
            !!form.controls[fieldName].errors 
            && 
            form.controls[fieldName].touched
        );
    }
    
    static getFieldError(form: FormGroup, fieldName: string): string | null {
        // Si el campo no existe, retornamos null
        if (!form.controls[fieldName]) return null;
        // Creamos una constante que contenga los errores del campo, si no tiene errores retornamos un objeto vacio
        const errors = form.controls[fieldName].errors ?? {};
        for (const key of Object.keys(errors)) {
            switch(key) {
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