import { Pipe } from '@angular/core';

@Pipe({
  name: 'arraySort'
})

export class ArraySort<T> {

  transform(array: T[], compareFn: (a: T, b: T) => number) {
      array.sort(compareFn);
      return array;
  }

}
