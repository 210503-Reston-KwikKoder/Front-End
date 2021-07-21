import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/Models/LanguageEnumModel';
@Pipe({
  name: 'displayCategory'
})
export class DisplayCategoryPipe implements PipeTransform {

  transform(value: number): string {
    return Language[value];
  }

}
