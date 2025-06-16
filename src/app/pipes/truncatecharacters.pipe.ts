import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'truncateCharacters',
  standalone: true,
})

export class TruncateCharactersPipe implements PipeTransform {
  transform(text: string, limit: number = 20): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
