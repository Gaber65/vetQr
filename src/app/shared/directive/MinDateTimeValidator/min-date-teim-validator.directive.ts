import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appMinDateTimeValidator]', // Fixed typo: Teim -> Time
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinDateTimeValidatorDirective,
      multi: true
    }
  ]
})
export class MinDateTimeValidatorDirective implements Validator {
  // Use the selector as the input name for a cleaner syntax
  @Input('appMinDateTimeValidator') minDate: string | Date | undefined;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    // If no value is entered or no minDate is provided, skip validation
    if (!value || !this.minDate) {
      return null;
    }

    const inputDate = new Date(value);
    const minDateLimit = new Date(this.minDate);

    // Check if the input date is earlier than the minimum allowed
    if (inputDate < minDateLimit) {
      return { 
        'minDateTime': { 
          required: minDateLimit, 
          actual: inputDate 
        } 
      };
    }

    return null; // Passed validation
  }
}