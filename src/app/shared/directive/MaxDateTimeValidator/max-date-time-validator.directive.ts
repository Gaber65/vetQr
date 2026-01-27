import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMaxDateTimeValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MaxDateTimeValidatorDirective,
      multi: true
    }
  ]
})
export class MaxDateTimeValidatorDirective implements Validator {
  // Input allows you to pass the max date from the HTML template
  @Input('appMaxDateTimeValidator') maxDate: string | Date | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value || !this.maxDate) {
      return null; // Return null if field is empty or no max date set
    }

    const inputDate = new Date(value);
    const maxDateLimit = new Date(this.maxDate);

    // Validation logic
    if (inputDate > maxDateLimit) {
      return { 
        'maxDateTime': { 
          required: maxDateLimit, 
          actual: inputDate 
        } 
      };
    }

    return null; // Validation passed
  }
}