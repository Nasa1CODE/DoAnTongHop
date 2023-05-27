import { AgFilterGridComponent } from './../grid/ag-filter-grid/ag-filter-grid.component';
import { AgFloatingFilterGridComponent } from '../grid/ag-floating-filter-grid/ag-floating-filter-grid.component';
import { AgCheckboxRendererComponent } from './../grid/ag-checkbox-renderer/ag-checkbox-renderer.component';
import { ColDef, Column, ColumnApi, GridApi, ICellEditorParams, IsColumnFunc } from '@ag-grid-enterprise/all-modules';
import { AgCellButtonRendererComponent } from '../grid/ag-cell-button-renderer/ag-cell-button-renderer.component';
import { AgDropdownRendererComponent } from '../grid/ag-dropdown-renderer/ag-dropdown-renderer.component';
import { AgDatepickerRendererComponent } from '../grid/ag-datepicker-renderer/ag-datepicker-renderer.component';
import { AgHeaderButtonGridComponent } from '../grid/ag-header-button-grid/ag-header-button-grid.component';

export interface PaginationParamsModel {
  totalCount?: number | undefined;
  totalPage?: number | undefined;
  sorting?: string | undefined;
  skipCount?: number | undefined;
  pageSize?: number | undefined;
  pageNum?: number | undefined;
}

export interface  GridParams {
  api: GridApi,
  columnApi: ColumnApi,
  editingStartedValue: string,
  invalidRcCode?: boolean,
  invalidPartCode?: boolean,
  invalidNeedQty?: string,
  preventStopEditing?: boolean
}

export interface GridFrameworkComponent {

}

export interface RowSelectionParams {
  api: GridApi,
  columnApi: ColumnApi
}

export interface CustomColDef extends ColDef {
  headerButtonDef?: {
    text?: string | Function;
    useRowData?: boolean;
    disabled?: boolean | Function;
    function?: (params: any) => void;
    iconName?: string;
    className?: string;
    message?: string;
  },
  buttonDef?: {
    text?: string | Function;
    useRowData?: boolean;
    disabled?: boolean | Function;
    function?: (params: any) => void;
    iconName?: string | Function;
    className?: string;
    message?: string;
    visible?: boolean | Function;
    tooltip?: string;
  },
  buttonDefTwo?: {
    text?: string | Function;
    useRowData?: boolean;
    disabled?: boolean | Function;
    function?: (params: any) => void;
    iconName?: string | Function;
    className?: string;
    message?: string;
    visible?: boolean | Function;
    tooltip?: string;
  },
  buttonDefThree?: {
    text?: string | Function;
    useRowData?: boolean;
    disabled?: boolean | Function;
    function?: (params: any) => void;
    iconName?: string | Function;
    className?: string;
    message?: string;
    visible?: boolean | Function;
    tooltip?: string;
  },
  disableSelect?: boolean | IsColumnFunc,
  list?: {
    key?: number,
    value?: string | number,
  }[] | Function,
  disabled?: boolean | IsColumnFunc,
  disableCheckbox?: boolean | IsColumnFunc,
  data?: string[] | boolean[] | number[],
  children?: CustomColDef[],
  validators?: string[],
  textFormatter?: IsColumnFunc | Function | any,
  property?: { key: string, value: string },
  listName?: string,
  api?: any,
  cellClass?: any,
  maxLength?: number,
}

export interface AgCellEditorParams extends ICellEditorParams {
  column: AgColumn,
  oldValue: string | number | undefined,
  newValue: string | number | undefined
  key?: string | number,
  event?: KeyboardEvent,
  colDef: CustomColDef,
  api: GridApi,
  columnApi: ColumnApi,
  data: any,
  source?: any
}

export interface AgColumn extends Column {
  editingStartedValue: string | number | undefined
}

export interface FrameworkComponent {
  agSelectRendererComponent?: typeof AgDropdownRendererComponent,
  agCellButtonComponent?: typeof AgCellButtonRendererComponent,
  agCheckboxRendererComponent?: typeof AgCheckboxRendererComponent,
  agDatepickerRendererComponent?: typeof AgDatepickerRendererComponent,
  agFloatingFilterGridComponent?: typeof AgFloatingFilterGridComponent,
  agFilterGridComponent?: typeof AgFilterGridComponent,
  agHeaderButtonGridComponent?: typeof AgHeaderButtonGridComponent,
}

export interface AgCellPositionParams {
  column?: Column,
  rowIndex?: number,
  rowPinned: string | undefined,
  floating: string | undefined
}