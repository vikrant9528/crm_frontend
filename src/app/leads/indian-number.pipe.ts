import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'indianNumber' })
export class IndianNumberPipe implements PipeTransform {
  transform(value: string | number | null | undefined): number {
    // handle null/undefined/empty
    if (value === null || value === undefined || value === '') return 0;

    // if already a number
    if (typeof value === 'number') {
      return isFinite(value) ? value : 0;
    }

    // string-safe: trim, lowercase, remove commas and common currency symbols/spaces
    const str = String(value).trim().toLowerCase().replace(/[,₹$ ]+/g, '');

    // crore
    if (str.endsWith('cr')) {
      const n = parseFloat(str.slice(0, -2));
      return isNaN(n) ? 0 : n * 10_000_000;
    }

    // lakh / lac
    if (str.endsWith('lakh') || str.endsWith('lac')) {
      const n = parseFloat(str.replace(/(lakh|lac)$/, ''));
      return isNaN(n) ? 0 : n * 100_000;
    }

    // plain number fallback
    const n = parseFloat(str);
    return isNaN(n) ? 0 : n;
  }
}
