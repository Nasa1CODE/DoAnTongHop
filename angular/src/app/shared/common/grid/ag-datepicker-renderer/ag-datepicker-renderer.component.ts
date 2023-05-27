import { Component, Input } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';

@Component({
    selector: 'ag-datepicker-renderer',
    templateUrl: './ag-datepicker-renderer.component.html',
    styleUrls: ['./ag-datepicker-renderer.component.less']
})
export class AgDatepickerRendererComponent implements ICellRendererAngularComp {

    hasTimePicker: boolean | Function;
    public params: any;
    field: string;
    // tslint:disable-next-line:ban-types
    disabled: boolean | Function;
    datePicker;

    constructor() {
    }

    agInit(params: any): void {
        this.params = params;
        if (typeof this.params.colDef.disabled === 'function') {
            this.disabled = this.params.colDef.disableSelect(params);
        } else {
            this.disabled = this.params.colDef.disabled || false;
        }
        this.field = this.params.colDef.field;
        this.datePicker = this.params.data[this.field];
        this.hasTimePicker = this.params.colDef.hasTimePicker;
    }

    changeDateValue(val) {
        if (!this.params.data[this.field] || ((this.params.data[this.field] && val) && this.params.data[this.field] !== val)) {
            this.params.column.editingStartedValue = this.params.data[this.field];
            this.params.node.setDataValue(this.params.colDef.field, val);
        }
    }

    refresh(): boolean {
        return false;
    }

}
