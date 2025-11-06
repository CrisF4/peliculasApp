import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pares',
  standalone: false
})
export class ParesPipe implements PipeTransform {
  // Agrupa los elementos de un array en subarrays de dos elementos cada uno
  transform(arr: any[]): any[] {
    const pares = arr.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []);
    // console.log(pares)
    return pares;
  }

}
