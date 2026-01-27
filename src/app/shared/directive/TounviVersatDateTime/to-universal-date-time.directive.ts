import { Directive, PipeTransform } from '@angular/core';

@Directive({
  selector: '[appToUniversalDateTime]',
  standalone: true
})
export class ToUniversalDateTimeDirective implements PipeTransform {
  transform(
    utcDate: string | null,
    format: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
     // timeZoneName: 'short' // عشان يطلع +GMT
    }
  ): string {
    if (!utcDate) return '';

    // نزود Z لو السيرفر مبعتش أوفست
    const normalized = /Z|[+\-]\d{2}:?\d{2}$/i.test(utcDate)
      ? utcDate
      : utcDate + 'Z';

    const date = new Date(normalized);

    // نخلي جافاسكربت يعمل Format حسب TimeZone الجهاز
    return new Intl.DateTimeFormat(undefined, format).format(date);
  }
}
