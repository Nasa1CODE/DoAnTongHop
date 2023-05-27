import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, EventEmitter, Injector, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PaginationModel } from '@shared/common/baseModel/base.model';
import { AgCellEditorParams, AgCellPositionParams, CustomColDef, FrameworkComponent, GridParams } from '../../models/base.model';
import { Module } from '@ag-grid-community/all-modules';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';


@Component({
  selector: 'simple-ag-grid',
  templateUrl: './simple-ag-grid.component.html',
  styleUrls: ['./simple-ag-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()],
})
export class SimpleAgGridComponent extends AppComponentBase implements OnInit {
  @Input() columnDefs?: CustomColDef[];
  @Input() defaultColDef;
  @Input() rowData: any[] = [];
  @Input() wrapText: boolean = false;
  @Output() callBackEvent = new EventEmitter();
  @Output() onChangeSelection = new EventEmitter();
  @Output() rowClicked = new EventEmitter();
  @Output() cellEditingStopped = new EventEmitter();
  @Input() rowSelection: string = 'single';
  @Input() textPagination: string = 'trong tổng số';
  @Output() onSearch: EventEmitter<any> = new EventEmitter();
  @Output() cellKeyPress = new EventEmitter();
  @Output() cellDoubleClicked = new EventEmitter();
  @Output() cellValueChanged = new EventEmitter();
  @Output() onRowSelection = new EventEmitter();
  @Output() filterChanged = new EventEmitter();
  @Output() columnResized = new EventEmitter();

  @Input() showPagination: boolean = true;
  @Input() paginationParams?: PaginationModel;
  @Input() enableFilter: boolean = false;
  @Output() changePaginationParams = new EventEmitter();

  @Input() className: string = '';
  @Input() getRowStyle: any;
  @Input() frameworkComponents?: FrameworkComponent;

  @Input() autoGroupColumnDef: any;
  @Input() groupDefaultExpanded: boolean = false;
  @Input() modules: Module[] = AllModules;
  @Input() isSuppressRowClickSelection: boolean = false;
  @Input() isSuppressLastEmptyLineOnPaste: boolean = false;
  @Input() isSuppressCellSelection: boolean = false;
  @Input() getContextMenuItems: any;
  @Input() groupMultiAutoColumn: boolean = false;
  @Input() masterDetail: boolean = false;
  @Input() detailCellRenderer: any;
  @Input() detailCellRendererFramework: any;
  @Input() detailCellRendererParams: any;
  @Output() firstDataRendered = new EventEmitter();

  cellEditStopParams: AgCellEditorParams | undefined;
  cellEditStartParams?: AgCellEditorParams;
  selectedData;
  style: any;
  params!: GridParams;
  previousFocusColumn: string = '';
  previousFocusRowIndex: number = -1;
  @Input() height: string = '227px';
  @Input() allowToGetMultiRecords: boolean = false;
  @Input() enableRangeSelection: boolean = true;
  @Input() sideBar;
  constructor(injector: Injector) {
    super(injector);
    this.rowSelection = this.rowSelection ?? 'single';
    this.tabToNextCell = this.tabToNextCell.bind(this);
  }

  ngOnInit() {
  if (this.height) this.setHeight(this.height);
    this.navigateToNextCell = this.navigateToNextCell.bind(this);

    this.defaultColDef = this.defaultColDef ? Object.assign({
      editable: false,
      resizable: true,
      menuTabs: [],
      stopEditingWhenCellsLoseFocus: true,
      tooltipValueGetter: (t: any) => t.value,
      cellStyle: (params: any) => {
        if (params.colDef.field === 'stt') {
              return { textAlign: 'center' };
          }
      },
      filter: 'agTextColumnFilter',
      floatingFilter: this.enableFilter,
      floatingFilterComponentParams: { suppressFilterButton: true },
    }, this.defaultColDef , {filter: this.defaultColDef?.filter ? this.defaultColDef.filter === true ? 'agTextColumnFilter' : this.defaultColDef.filter : 'agTextColumnFilter' }) : {
      editable: false,
      resizable: true,
      stopEditingWhenCellsLoseFocus: true,
      menuTabs: [],
      tooltipValueGetter: (t: any) => t.value,
      cellStyle: (params: any) => {
        if (params.colDef.field === 'stt') {
              return { textAlign: 'center' };
          }
      },
      filter: 'agTextColumnFilter',
      autoHeight: this.wrapText,
        wrapText: this.wrapText,
      floatingFilterComponentParams: { suppressFilterButton: true }
    };

  }

  onGridReady(params: GridParams) {
    this.params = params;
    // setTimeout(()=>{
    //     params.api.resetRowHeights();
    //     console.log(1);
    // },5000)

    this.callBackEvent.emit(params);
  }

  firstDataRenderedEvent(params: any) {
    return this.firstDataRendered.emit(params);
  }

  onFilterChanged(params: any) {
    return this.filterChanged.emit(params)
  }
  onColumnResized(params: any) {
      return this.columnResized.emit(params)
  }

  processCellForClipboard(params) {
      return params?.value ?? '';
  };

  setHeight(height: string) {
    this.style = Object.assign({}, { height });
  }

  onSelectionChanged(params: AgCellEditorParams) {
    this.selectedData = params.api.getSelectedRows()[0];
    return this.onChangeSelection.emit(params);
  }

  onRowClicked(event: AgCellEditorParams) {
    return this.rowClicked.emit(event);
  }

  onCellEditingStopped(params: AgCellEditorParams) {
    this.cellEditStopParams = params;
    //resize row for wraptext
    if(this.wrapText){
        this.cellEditStopParams.api.resetRowHeights();
    }
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

  onCellValueChanged(params: AgCellEditorParams) {
    if (params.colDef.field !== 'checked') {
        this.cellValueChanged.emit(params);
    }
  }

  onRowSelected(params: AgCellEditorParams) {
    return this.onRowSelection.emit(params);
  }

  changePage(params: AgCellEditorParams) { this.changePaginationParams.emit(params); }

  onCellEditingStarted(params: AgCellEditorParams) {
    params.column.editingStartedValue = params.value;
    this.cellEditStartParams = params;
  }

  onCellKeyPress(params: AgCellEditorParams) {
    if (['Enter'].indexOf(params.event.key.toString()) !== -1) this.onSearch.emit(params);
    else this.cellKeyPress.emit(params);
  }

  onKeyDown(event: KeyboardEvent | any) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.params.api.stopEditing();
    }
    // Copy Cell
    if ((event.ctrlKey || event.metaKey) && event.code === 'KeyC') {
        const selBox = document.createElement('textarea');
        selBox.style.opacity = '0';
        selBox.value = event.target.innerHTML;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
      }
  }

  cellDoubleClickedEvent(params: AgCellEditorParams) {
    return this.cellDoubleClicked.emit(params);
  }

  tabToNextCell(params) { // Sử dụng tab để focus vào những ô cần sửa
    var previousCell = params.previousCellPosition,
        nextCell = params.nextCellPosition,
        nextRowIndex = previousCell.rowIndex,
        renderedRowCount = params?.nextCellPosition?.column.gridApi?.getDisplayedRowCount(),
        result;

    if (nextRowIndex < 0) nextRowIndex = -1;
    if (nextRowIndex >= renderedRowCount) nextRowIndex = renderedRowCount - 1;

    const condition = previousCell.column.getColId() === this.columnDefs.find(e => e.editable || typeof e.editable === 'function')?.field
        || previousCell.column.getColId() === this.columnDefs[0].children?.find(e => e.editable || typeof e.editable === 'function')?.field;

    if (this.cellEditStartParams && condition) {
        previousCell.column.vale = this.cellEditStartParams?.data[previousCell.column.colId];
        previousCell.column.data = this.cellEditStartParams?.data;
        const colId = this.params.api.getFocusedCell()?.column?.getColId() ?? previousCell.column.getColId();
        this.onSearch.emit(this.selectedData ? { colDef: { field: colId }, data: this.selectedData, value: this.selectedData[colId] } : previousCell.column);

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
        if (previousCell.column.getColDef().editable || (typeof previousCell.column.getColDef().editable === 'function')) {
            setTimeout(() => {
                this.params.api.startEditingCell({ rowIndex: nextRowIndex, colKey: previousCell.column.getColId() });
            });
        }
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
  stringMaxLengthValidate(params: AgCellEditorParams) {
    if (params.newValue && params.newValue.toString().length > params.colDef.maxLength) {
      this.notify.warn(this.l('CannotBeGreaterThanCharacter', this.l(params.colDef.headerName), params.colDef.maxLength));
      params.api.setFocusedCell(params.rowIndex, params.colDef.field);
      params.api.startEditingCell({ rowIndex: params.rowIndex, colKey: params.colDef.field });
      return true;
    }
    return false;
  }
}
