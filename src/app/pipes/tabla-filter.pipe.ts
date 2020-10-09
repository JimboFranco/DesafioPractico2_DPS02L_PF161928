import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tablaFilter'
})
export class TablaFilterPipe implements PipeTransform {

  transform(value: any[], search: string): unknown {
    if (!search) {
      return value;
    }
    return value.filter(items => items.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()) );
  }

}
