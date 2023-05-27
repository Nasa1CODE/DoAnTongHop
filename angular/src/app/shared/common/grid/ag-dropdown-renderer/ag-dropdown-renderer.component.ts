import { SuppressKeyboardEventParams } from '@ag-grid-enterprise/all-modules';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { AgCellEditorParams } from '../../models/base.model';

@Component({
    selector: 'ag-dropdown-renderer',
    templateUrl: './ag-dropdown-renderer.component.html',
    styleUrls: ['./ag-dropdown-renderer.component.less']
})
export class AgDropdownRendererComponent implements ICellRendererAngularComp, AfterViewInit {

    params: AgCellEditorParams;
    selectForm: FormGroup;
    field: string = '';
    disableSelect: boolean | Function;
    idSelect;
    select;
    oldValue;
    label: string = 'value';
    value: string = 'key';
    selectList: any[] | Function;
    noPadding: boolean = false;
    @ViewChild('selectTag') selectTag: ElementRef;

    constructor() {
    }
    ngAfterViewInit() {
        if (this.field === 'bpJobGroup') setTimeout(() => this.selectTag.nativeElement.focus()); // Dung cho bao gia  -- quocanhckhd
    }

    ngOnInit() {
    }

    async agInit(params: any) {
        this.params = params ?? this.params;
        this.field = this.params.colDef.field;
        this.idSelect = params.rowIndex + this.field;
        if (typeof this.params.colDef.disableSelect === 'function') {
            this.disableSelect = this.params.colDef.disableSelect(params);
        } else {
            this.disableSelect = this.params.colDef.disableSelect || false;
        }
        this.label = this.params.colDef.property?.value ?? this.label;
        this.value = this.params.colDef.property?.key ?? this.value;
        if (typeof this.params.colDef.list === 'function') {
            this.selectList = this.params.colDef.list(params);
        } else {
            this.selectList = this.params.colDef.list;
        }

        // if (this.params.colDef.listName) {
        //     this.selectList = this.params.data[this.params.colDef.listName.toString()]; // Không thấy dùng ở đâu cả -- quocanhckhd
        // }

        if (typeof this.params.colDef?.api === 'function') {
            await this.params.colDef.api().subscribe((val) => {
                if (val) {
                    this.selectList = val;
                }
            });
        }
        //this.noPadding = this.params.colDef?.cellClass?.indexOf('p-0') !== -1;
        this.buildForm();
    }

    buildForm() {
        this.select = this.params.data ? this.params.data[this.field] : null;
    }

    refresh(): boolean {
        return false;
    }

    onValueChange(value) {
        this.params.column.editingStartedValue = this.params.data[this.field];
        this.params.node.setDataValue(this.field, value);

        if (this.params.colDef.field === 'provinceId') {
            this.params.api.startEditingCell({
                rowIndex: this.params.node.rowIndex,
                colKey: 'districtId'
            });
        }
        this.oldValue = value;
    }

}
