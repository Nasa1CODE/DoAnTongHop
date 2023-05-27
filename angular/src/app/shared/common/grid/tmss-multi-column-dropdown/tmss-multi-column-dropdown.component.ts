import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, Input, ElementRef, forwardRef, HostListener } from '@angular/core';

@Component({
  selector: 'tmss-multi-column-dropdown',
  templateUrl: './tmss-multi-column-dropdown.component.html',
  styleUrls: ['./tmss-multi-column-dropdown.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TmssMultiColumnDropdownComponent),
      multi: true,
    }],
})
export class TmssMultiColumnDropdownComponent implements ControlValueAccessor {

  @Input() columnDefs: Array<any>;
  @Input() list: Array<any>;
  @Input() defaultColDef;
  @Input() displayField: string;
  @Input() isRequired;
  @Input() apiCall: Function;
  @Input() isClear = true;
  @Input() dataField: string;
  @Input() text: string;
  @Input() height;
  @Input() isDisabled: boolean = false;
  @Input() className;
  @Input() disableInput: boolean = true;
  @Input() enableFilter: boolean = false;

  // tslint:disable-next-line:ban-types
  private onChange: Function;
  gridApi;
  gridColumnApi;
  selectedValue = new Object();
  isShowList: boolean;

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  writeValue(val: any): void {
    // tslint:disable-next-line: curly
    if (val === null || val === undefined) {
      this.selectedValue[this.displayField] = '';
      return;
    }
    this.selectedValue = this.dataField ?
      this.list.find(data => data[this.dataField] === val) : val;

    this.selectedValue ? this.selectedValue = this.selectedValue : this.selectedValue = '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  callbackGrid(params) {
    if (this.apiCall) {
      this.apiCall(params);
    }
    if (this.list) {
      params.api.setRowData(this.list);
    }
    setTimeout(() => {
      //params.api.sizeColumnsToFit();
    });
    this.gridApi = params.api;
    this.gridApi = params.columnApi;
    this.gridApi.getSelectedRows().length = 1;
  }

  onChangeSelection(params) {
    this.gridApi = params.api;
    const rowsSelection = this.gridApi.getSelectedRows()[0];
    if (rowsSelection) {
      this.selectedValue = rowsSelection;
      if (typeof this.onChange === 'function') {
        this.isShowList = false;
        this.onChange(!this.dataField ? this.selectedValue : this.selectedValue[this.dataField]);
      }
    }
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }

    if(!this.disableInput && targetElement.localName === "input"){
        this.isShowList = false;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.isShowList = false;
    }
    // const clickedInside = this.elementRef.nativeElement.contains(targetElement) && targetElement.localName === 'input';
    // const clickedCaret = this.elementRef.nativeElement.contains(targetElement) && targetElement.localName === 'i';
    // if (clickedCaret && !this.isDisabled) {
    //     this.isShowList = true;
    // }
    // if (!clickedInside || !this.isDisabled) {
    //   this.isShowList = false;
    // }
  }

  clearValue() {
    this.selectedValue = null;
    if (typeof this.onChange === 'function') {
      this.isShowList = false;
      this.onChange(this.selectedValue);
    }
  }

}
