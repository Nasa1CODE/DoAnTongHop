import {
    Component,
    Input,
    Output,
    EventEmitter,
    Injector,
    ViewEncapsulation,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { PaginationModel } from '@shared/common/baseModel/base.model';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ClientSideRowModelModule, Module } from '@ag-grid-community/all-modules';
import { AgCellEditorParams, AgCellPositionParams, CustomColDef, FrameworkComponent, GridParams } from '../../models/base.model';
import { MultiFilterModule, RangeSelectionModule, RichSelectModule, RowGroupingModule, SetFilterModule } from '@ag-grid-enterprise/all-modules';


@Component({
    selector: 'grid-table',
    templateUrl: './grid-table.component.html',
    styleUrls: ['./grid-table.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
})

export class GridTableComponent extends AppComponentBase implements OnInit {

    @ViewChild('input', { static: false }) input?: ElementRef;

    //Col Def
    @Input() columnDefs?: CustomColDef[];
    @Input() defaultColDef;
    @Input() autoGroupColumnDef: any;
    @Input() frameworkComponents?: FrameworkComponent;
    @Input() rowData: any[] = [];
    @Input() modules: Module[] = [ClientSideRowModelModule, RangeSelectionModule, RowGroupingModule, RichSelectModule, SetFilterModule, MultiFilterModule];
    @Input() detailRowData: any[] = [];
    @Input() rowModelType: string = 'clientSide';
    @Input() groupDefaultExpanded: boolean = false;
    @Input() groupUseEntireRow = false;
    @Input() animateRows: boolean = false;
    @Input() detailRowHeight: number = 100;
    @Input() textPagination: string = 'trong tổng số';

    //Grid and pagintion
    @Input() paginationParams?: PaginationModel;
    @Output() changePaginationParams = new EventEmitter();
    @Output() callBackEvent = new EventEmitter();

    //StyleonChangeSelection
    @Input() height: string = '227px';
    @Input() getRowStyle: any;
    @Input() pinnedBottomRowData: any;
    focused: boolean = false;
    @Input() enableCellTextSelection = false;

    // Cell
    @Output() onChangeSelection = new EventEmitter();
    @Input() rowSelection: string = 'single';
    @Output() cellDoubleClicked = new EventEmitter();
    @Output() cellKeyPress = new EventEmitter();
    @Output() cellValueChanged = new EventEmitter();
    @Output() cellEditingStopped = new EventEmitter();
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    @Output() rowClicked = new EventEmitter();
    @Output() rowSelected = new EventEmitter();
    @Output() rowDragEnd = new EventEmitter();
    @Output() keydown = new EventEmitter();
    @Output() filterChanged = new EventEmitter();

    cellEditStopParams: AgCellEditorParams | undefined;
    @Input() showPagination: boolean = true;

    @Input() isSuppressHorizontalScroll: boolean = false;
    @Input() isSuppressRowClickSelection: boolean = false;
    @Input() isSuppressLastEmptyLineOnPaste: boolean = false;
    @Input() className: string = '';
    style: any;
    autoHeight: string | undefined;
    cellEditStartParams?: AgCellEditorParams;
    @Input() checkedData: boolean = false;
    params!: GridParams;
    @Input() enableFilter: boolean = false;
    @Input() allowToGetMultiRecords: boolean = false;

    constructor(injector: Injector) {
        super(injector);
        this.rowSelection = this.rowSelection ?? 'single';
        this.tabToNextCell = this.tabToNextCell.bind(this);
        this.navigateToNextCell = this.navigateToNextCell.bind(this);
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if (this.height) {
            this.setHeight(this.height);
        } else {
            this.autoHeight = 'autoHeight';
        }
        //if (!this.autoGroupColumnDef) {
            this.defaultColDef = this.defaultColDef ? Object.assign({
                editable: false,
                resizable: true,
                menuTabs: [],
                tooltipValueGetter: (t: any) => t.value,
                cellStyle: (params: any) => {
                  if (params.colDef.field === 'stt') {
                        return { textAlign: 'center' };
                    }
                },
                filter: 'agTextColumnFilter',
                floatingFilter: this.enableFilter,
                floatingFilterComponentParams: { suppressFilterButton: true },
              }, this.defaultColDef, {filter: this.defaultColDef?.filter ? this.defaultColDef.filter === true ? 'agTextColumnFilter' : this.defaultColDef.filter : 'agTextColumnFilter' }) : {
                editable: false,
                resizable: true,
                menuTabs: [],
                tooltipValueGetter: (t: any) => t.value,
                cellStyle: (params: any) => {
                  if (params.colDef.field === 'stt') {
                        return { textAlign: 'center' };
                    }
                },
                stopEditingWhenCellsLoseFocus: true,
                filter: 'agTextColumnFilter',
                floatingFilterComponentParams: { suppressFilterButton: true }
              };
        //}
    }

    processCellForClipboard(params) {
       return params?.value ?? '';
    };

    setHeight(height: string) {
        this.style = Object.assign({}, { height });
    }

    onGridReady(params: GridParams) {
        this.params = params;
        this.callBackEvent.emit(params);
    }

    onCellKeyPress(params: AgCellEditorParams) {
        if (['Enter'].indexOf(params.event.key.toString()) !== -1) this.onSearch.emit(params);
        else this.cellKeyPress.emit(params);
    }


    changePage(params: AgCellEditorParams) {
        this.changePaginationParams.emit(params);
    }

    onRowFocused() {
    }

    cellDoubleClickedEvent(params: AgCellEditorParams) {
        return this.cellDoubleClicked.emit(params);
    }

    onCellValueChanged(params: AgCellEditorParams) {
        if (this.checkedData) {
            this.checkedValueChange(params);
        }

        if (params.colDef.field !== 'checked') {
            this.cellValueChanged.emit(params);
        }
    }

    onSelectionChanged(params: AgCellEditorParams) {
        return this.onChangeSelection.emit(params);
      }

    onRowClicked(event: AgCellEditorParams) {
        return this.rowClicked.emit(event);
    }

    onRowSelected(event: AgCellEditorParams) {
        return this.rowSelected.emit(event);
    }

    onRowDragEnd(event: AgCellEditorParams) {
        return this.rowDragEnd.emit(event);

    }

    onFilterChanged(event: AgCellEditorParams) {
        return this.filterChanged.emit(event);
    }

    checkedValueChange(params: any) {
        let index;
        if (params.api.getColumnDef('checked')) {
            index = params.api.getColumnDef('checked').fieldCheck;
        }
        if (params.data.checked) {
            this.checkedData[params.data[index]] = params.data;
        } else if (this.checkedData[params.data[index]]) {
            delete this.checkedData[params.data[index]];
        }
    }

    onCellEditingStarted(params: AgCellEditorParams) {
        params.column.editingStartedValue = params.value;
        this.cellEditStartParams = params;
    }

    onCellEditingStopped(params: AgCellEditorParams) {
        this.cellEditStopParams = params;
        const validators = this.cellEditStartParams ? this.cellEditStartParams.colDef.validators : null;
        if (validators && validators.length > 0) {
            for (let i = 0, length = validators.length; i < length; i++) {
                if (this[`${validators[i]}Validate`].call(this, params)) {
                    return;
                }
            }
        }

        this.cellEditingStopped.emit(params);
    }

    tabToNextCell(params) { // Sử dụng tab để focus vào những ô cần sửa
        var previousCell = params.previousCellPosition,
            nextCell = params.nextCellPosition,
            nextRowIndex = previousCell.rowIndex,
            renderedRowCount = params?.nextCellPosition?.column.gridApi?.getDisplayedRowCount(),
            result;

        if (nextRowIndex < 0) nextRowIndex = -1;
        if (nextRowIndex >= renderedRowCount) nextRowIndex = renderedRowCount - 1;

        const condition = previousCell.column.colId === this.columnDefs.find(e => e.editable || typeof e.editable === 'function')?.field
            || previousCell.column.colId === this.columnDefs[0].children?.find(e => e.editable || typeof e.editable === 'function')?.field;

        if (this.cellEditStartParams && condition) {
            previousCell.column.value = this.cellEditStartParams?.data[previousCell.column.colId];
            previousCell.column.data = this.cellEditStartParams?.data;
            this.onSearch.emit(previousCell.column);
            return params.previousCellPosition;
        }
        else {
            result = {
                rowIndex: nextRowIndex,
                column: nextCell != null ? nextCell.column : previousCell.column,
                floating: nextCell != null ? nextCell.floating : previousCell.floating,
            };

            return result;
        }
    }

    navigateToNextCell(params: { event: KeyboardEvent, key: number, nextCellPosition: AgCellPositionParams, previousCellPosition: AgCellPositionParams }) {
        // const nextCell = params.nextCellPosition.column,
        // ;
        var KEY_UP = 38;
        var KEY_DOWN = 40;
        var KEY_LEFT = 37;
        var KEY_RIGHT = 39;

        var previousCell = params.previousCellPosition,
            suggestedNextCell = params.nextCellPosition,
            nextRowIndex,
            renderedRowCount;
        this.params.api.stopEditing();
        switch (params.key) {
            case KEY_UP:
                // return the cell above
                nextRowIndex = previousCell.rowIndex - 1;
                if (nextRowIndex < 0) {
                    return null;
                } // returning null means don't navigate

                if (this.params.api.getDisplayedRowAtIndex(nextRowIndex).group)
                {
                    if(nextRowIndex > 0) nextRowIndex = nextRowIndex - 1
                    else return null;
                }
                if (!this.isSuppressRowClickSelection) this.params.api.getDisplayedRowAtIndex(nextRowIndex)?.setSelected(true);
                return {
                    rowIndex: nextRowIndex,
                    column: previousCell.column,
                    floating: previousCell.floating,
                };
            case KEY_DOWN:
                // return the cell below
                nextRowIndex = previousCell.rowIndex + 1;
                renderedRowCount = this.params.api.getDisplayedRowCount();
                if (nextRowIndex >= renderedRowCount) {
                    return null;
                } // returning null means don't navigate

                if (this.params.api.getDisplayedRowAtIndex(nextRowIndex).group) nextRowIndex = nextRowIndex + 1;
                if (!this.isSuppressRowClickSelection) this.params.api.getDisplayedRowAtIndex(nextRowIndex)?.setSelected(true);
                return {
                    rowIndex: nextRowIndex,
                    column: previousCell.column,
                    floating: previousCell.floating,
                };
            case KEY_LEFT:
            case KEY_RIGHT:
                if (!this.isSuppressRowClickSelection) this.params.api.getDisplayedRowAtIndex(nextRowIndex)?.setSelected(true);
                return suggestedNextCell;
            default:
                throw 'this will never happen, navigation is always one of the 4 keys above';
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            this.params.api.stopEditing();
        }
    }

    //#region -- Validation
    focusAfterEdit(params: AgCellEditorParams) {
        params.api.clearRangeSelection();
        params.api.setFocusedCell(params.rowIndex, params.colDef.field);
        params.api.startEditingCell({ rowIndex: params.rowIndex, colKey: params.colDef.field });

    }

    numberValidate(params: AgCellEditorParams) {
        const NUMBER_REGEX = /^\d+$/g;
        if (isNaN(Number(params.newValue.toString().replace('.', '').replace(',', '')))) {
            this.notify.warn(this.l('NotValid', this.l(params.colDef.headerName)));
            params.node.setDataValue(params.colDef.field, params.oldValue);
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    requiredValidate(params) {
        if (params.column.editingStartedValue && (!params.value || !params.value.toString())) {
            this.notify.warn(this.l('DataCannotBeNull'));
            //  this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    integerNumberValidate(params) {
        const NUMBER_REGEX = /^\d+$/g;
        if (params.newValue !== '' && (params.newValue && !NUMBER_REGEX.test(params.newValue))) {
            params.node.setDataValue(params.colDef.field, params.oldValue);
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    stringMaxLengthValidate(params: AgCellEditorParams) {
        if (params.newValue && params.newValue.toString().length > params.colDef.maxLength) {
            this.notify.warn(this.l('CannotBeGreaterThanCharacter', this.l(params.colDef.headerName), params.colDef.maxLength));
            params.api.setFocusedCell(params.rowIndex, params.colDef.field);
            params.api.startEditingCell({ rowIndex: params.rowIndex, colKey: params.colDef.field });
            return true;
        }
        return false;
    }

    notNegativeNumberValidate(params) {
        if (params.value !== '' && (params.value && Number(params.value) < 0)) {
            // this.resetAfterEdit(params);
            this.notify.warn('Không thể là số âm');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    positiveNumberValidate(params) {
        const NUMBER_REG = /^\d+$/g;
        if (params.value !== '' && ((params.value && Number(params.value) <= 0) || !NUMBER_REG.test(params.value))) {
            // this.resetAfterEdit(params);
            this.notify.warn('Phải là nguyên số dương');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    notNagetiveIntNumberValidate(params) {
        const NUMBER_REG = /^\d+$/g;
        if (params.value !== '' && ((params.value && Number(params.value) < 0) || !NUMBER_REG.test(params.value))) {
            // this.resetAfterEdit(params);
            this.notify.warn('Phải là số nguyên không âm');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    intNumberValidate(params) {
        const NUMBER_REG = /^([+-]?[1-9]\d*|0)$/;
        if (params.value !== '' && !NUMBER_REG.test(params.value)) {
            // this.resetAfterEdit(params);
            this.notify.warn('Phải là số nguyên');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    floatNumberValidate(params) {
        // Accept both negative and positive float number
        const NUMBER_REG = /^-?\d+(\.\d{0,2})?$/g;
        if (params.value !== '' && (params.value && !NUMBER_REG.test(params.value))) {
            // this.resetAfterEdit(params);
            this.notify.warn('Không đúng định dạng số (Mẫu: 2.54)');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    floatPositiveNumValidate(params) {
        // Accept 0 and positive float number
        const NUMBER_REG = /^(?=.*[0-9])\d*(?:\.\d{1,2})?$/g;
        if (params.value !== '' && (params.value && !NUMBER_REG.test(params.value))) {
            // this.resetAfterEdit(params);
            this.notify.warn('Không đúng định dạng số (Mẫu: 2.54)');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    floatPositiveNum1Validate(params) {
        // Accept only float numbers that are greater than 0
        const NUMBER_REG = /^(?=.*[1-9])\d*(?:\.\d{1,2})?$/g;
        if (params.value !== '' && (params.value && !NUMBER_REG.test(params.value))) {
            // this.resetAfterEdit(params);
            this.notify.warn('Yêu cầu là số lơn hơn 0');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    phoneValidate(params) {
        const PHONE_REGEX = /^0[0-9]{9,10}$/g;
        if (params.value && !PHONE_REGEX.test(params.value)) {
            // this.resetAfterEdit(params);
            this.notify.warn('Dữ liệu không phải định dạng số điện thoại');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }

    identityNumberValidate(params) {
        if (params.value && params.value.toString().trim().length !== 9 && params.value.toString().trim().length !== 12) {
            this.focusAfterEdit(params);
            this.notify.warn('Dữ liệu không phải định dạng số CMT');
            return true;
        }
        return false;
    }

    afterTodayValidate(params) {
        const isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const date = new Date().getDate();
        const today = isFirefox ? new Date(Date.UTC(year, month, date, 23, 59, 59))
            : new Date(year, month, date, 23, 59, 59);
        if (params.value !== params.column.editingStartedValue && params.value <= today) {
            this.notify.warn('Ngày được chọn phải lớn hơn ngày hôm nay');
            this.focusAfterEdit(params);
            return true;
        }
        return false;
    }
    //#endregion
}
