import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
  transform(errors: null | undefined | { [key: string]: string & { [key: string]: unknown } }): string {
    if (!errors) {
      return '';
    }

    if (errors['required']) {
      return 'Field is required';
    }

    if (errors['email']) {
      return 'Field is invalid';
    }

    return '';
  }
}

@NgModule({
  imports: [],
  exports: [ErrorMessagePipe],
  declarations: [ErrorMessagePipe],
  providers: []
})
export class ErrorMessagePipeModule {}
