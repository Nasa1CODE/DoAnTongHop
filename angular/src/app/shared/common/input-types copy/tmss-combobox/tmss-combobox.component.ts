import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, forwardRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'tmss-combobox',
  templateUrl: './tmss-combobox.component.html',
  styleUrls: ['./tmss-combobox.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TmssComboboxComponent),
      multi: true,
    },
  ],
})
export class TmssComboboxComponent implements ControlValueAccessor {
  @Input() className: string = '';
  @Input() value: any;
  @Input() items: any[] = [];
  @Input() text: string = '';
  @Input() isRequired: boolean = false;
  @Input() isValidate: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() selectedItem: any;
  @Input() label: string = 'label';
  @Input() key: string = 'value';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';

  @Output() onChangeValue = new EventEmitter();
  @ViewChild('input', {static: false}) input!: ElementRef;

  private onChange: Function = new Function();

  constructor(
  ) {
  }
  writeValue(val: any): void {
    this.value = val ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  changeValue(e: any) {
    if (!isNaN(e.target.value) && this.type === 'number') {
      this.value = Number(e.target.value);
      if (typeof this.onChange === 'function') {
        this.onChange(Number(e.target.value));
      }
      this.onChangeValue.emit(Number(e.target.value));
    } else {
    if (isNaN(e.target.value) && (e.target.value == 'undefined' || e.target.value == 'null' || !e.target.value)) this.value = undefined;
      //if (isNaN(e.target.value)) this.value = undefined;
      else this.value = e.target.value;
      if (typeof this.onChange === 'function') {
        this.onChange(this.value);
      }
      this.onChangeValue.emit(this.value);
    }
  }
}
