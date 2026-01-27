import { Directive, PipeTransform } from '@angular/core';

@Directive({
  selector: '[appDateTimeFormate]',
  standalone: true
})
export class DateTimeFormateDirective implements PipeTransform {

  transform(value: string | Date, dateFormat: string = 'yyyy/MM/dd', timeFormat: string = 'h:mm a'): string {
    if (!value) {
      return '-';  // Return dash if value is null or undefined
    }

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      return '-';  // Return dash if the date is invalid
    }

    // Format the date part
    const formattedDate = this.formatDate(date, dateFormat);

    // Format the time part
    const formattedTime = this.formatTime(date, timeFormat);

    // Combine date and time with a line break
    return `${formattedDate}\n${formattedTime}`;
  }

  private formatDate(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };

    return date.toLocaleDateString('en-GB', options).split('/').reverse().join('/');
  }

  private formatTime(date: Date, format: string): string {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };

    return date.toLocaleTimeString('en-US', options);
  }

}