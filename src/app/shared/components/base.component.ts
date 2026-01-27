import { Component } from '@angular/core';
import { BaseService } from '../services/base.service';

@Component({
  template: ''
})
export abstract class BaseComponent {

  constructor() { }

  /**
 * Converts a UTC date string (from backend) to a formatted local date string.
 * @param utcDate The date string or Date object from the backend.
 * @param options Intl.DateTimeFormatOptions for custom formatting.
 * @returns A formatted string in the user's local timezone.
 */
  formatToLocalTime(
  utcDate: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }
): string {
  if (!utcDate) return '';

  // 1. Convert to string if it's a Date object
  let dateStr = utcDate instanceof Date ? utcDate.toISOString() : utcDate;

  // 2. Ensure UTC 'Z' exists if no offset is present
  const hasOffset = /Z|[+\-]\d{2}:?\d{2}$/i.test(dateStr);
  const normalized = hasOffset ? dateStr : `${dateStr}Z`;

  const date = new Date(normalized);

  // 3. Validation
  if (isNaN(date.getTime())) {
    console.error('Invalid Date String:', utcDate);
    return 'Invalid Date';
  }

  // 4. Format based on system locale
  return new Intl.DateTimeFormat(navigator.language, options).format(date);
}


/**
 * Converts any date format (string or Date object) to UTC ISO string 
 * for backend consumption.
 */
  convertToUTC(dateValue: string | Date | null | undefined): string | null {
  if (!dateValue) return null;

  // 1. Create a Date object from the value
  const date = new Date(dateValue);

  // 2. Validate the date
  if (isNaN(date.getTime())) {
    console.error('Invalid date provided to convertToUTC:', dateValue);
    return null;
  }

  // 3. toISOString() always converts to UTC (Zero Offset)
  return date.toISOString();
}

}
