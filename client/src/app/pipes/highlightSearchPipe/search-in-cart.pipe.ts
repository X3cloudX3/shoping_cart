import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightSearchPipe implements PipeTransform {
  transform(value: string, args: string): any {
    if (args && value) {
      let startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex != -1) {
        let endLength = args.length;
        let matchingString = value.substr(startIndex, endLength);
        return value.replace(matchingString, `<b>${matchingString}</b>`);
      }
    }
    return value;
  }
}