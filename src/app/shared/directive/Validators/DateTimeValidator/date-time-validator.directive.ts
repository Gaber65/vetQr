import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appDateTimeValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DateTimeValidatorDirective,
      multi: true
    }
  ]
})
export class DateTimeValidatorDirective implements Validator {
  @Input('minDate') minDate?: Date;
  @Input('maxDate') maxDate?: Date;

  validate(control: AbstractControl): ValidationErrors | null {
    return dateRangeValidator(this.minDate, this.maxDate)(control);
  }
}

/** * Keep the function outside the class so you can still 
 * use it in Reactive Forms as well!
 */
export function dateRangeValidator(min?: Date, max?: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null; 

    const inputDate = new Date(value);

    if (min && inputDate < min) {
      return { minDate: { required: min, actual: inputDate } };
    }

    if (max && inputDate > max) {
      return { maxDate: { required: max, actual: inputDate } };
    }

    return null;
  };
}