import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
///ng g pipe search
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //if no data return null
    if (!value) return null;
    //if no input value return null
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter((item: any) => {
      return JSON.stringify(item).toLowerCase().includes(args);
    })
  }

}
