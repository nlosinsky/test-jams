import { AbstractControl, UntypedFormGroup } from '@angular/forms';

export class FormHelper {
  static isValidField(field: AbstractControl | null): boolean {
    if (!field) {
      return true;
    }
    return !(field.invalid && (field.dirty || field.touched));
  }

  static setAllControlsDirty(controls: { [key: string]: AbstractControl | UntypedFormGroup }): void {
    Object.keys(controls)
      .map(key => controls[key])
      .forEach((value: AbstractControl) => {
        if (value instanceof UntypedFormGroup) {
          this.setAllControlsDirty(value.controls);
        } else {
          value.markAsDirty({ onlySelf: true });
        }
      });
  }
}
