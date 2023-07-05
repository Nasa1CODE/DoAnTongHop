import { AllCommunityModules, AllModules, ColDef, IsColumnFunc, Module } from "@ag-grid-enterprise/all-modules";
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { CreateOrEditMstIngredientDto, MstTableDto, SalesInvoiceForViewDto, SalesInvoiceServiceProxy } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { GridTableService } from "@app/shared/common/services/grid-table.service";
import { DateTimeService } from "@app/shared/common/timing/date-time.service";
import { FileDownloadService } from "@shared/utils/file-download.service";
import { CustomColDef, FrameworkComponent, GridParams } from "@app/shared/common/models/base.model";
import { AgCellButtonRendererComponent } from "@app/shared/common/grid/ag-cell-button-renderer/ag-cell-button-renderer.component";
import { finalize } from 'rxjs/operators';
import { ClientSideRowModelModule } from "@ag-grid-enterprise/all-modules";
import { DatePipe } from "@angular/common";

@Component({
    templateUrl: './invoice.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoice.component.less'],
    animations: [appModuleAnimation()]
})
export class InvoiceComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    // @ViewChild('CreateOrEditIngredient', { static: true }) CreateOrEditIngredient: CreateOrEditIngredientComponent;
    paginationParams: PaginationParamsModel = { pageNum: 1, pageSize: 20, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 };
    pipe = new DatePipe('en-US');
    defaultColDefs: CustomColDef[] = [];;
    dataParams: GridParams | undefined;
    defaultColDef: CustomColDef;
    filterText;
    rowSelection:any;
    oracleInvoiceBatchName;
    selectedInvoice: SalesInvoiceForViewDto = new SalesInvoiceForViewDto();
    saveSelectedRow: MstTableDto = new MstTableDto();
    datas: MstTableDto = new MstTableDto();
    isLoading: boolean = false;
    rowData: any[] = [];
    filter: string = '';
    selecteId: MstTableDto[] = [];
	frameworkComponents: FrameworkComponent;
    modules: Module[] = [ClientSideRowModelModule];
    EmployeeId = -1;
    TableId = -1;
    listEmployeeType = [];
    listTableType = [];
    showAdvanceFilter: boolean = false;
    constructor(
        injector: Injector,
        private _service: SalesInvoiceServiceProxy,
        private gridTableService: GridTableService,
        private _dateTimeService: DateTimeService,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
        this.defaultColDefs = [
            {   headerName: this.l('STT'),
                headerTooltip: this.l('STT')
                ,cellRenderer: (params) =>params.rowIndex + 1 + this.paginationParams.pageSize * (this.paginationParams.pageNum - 1)
                ,cellClass: ['text-center']
                ,width: 55,
            },
            {
                headerName: this.l('EmployeeName'),
                headerTooltip: this.l('EmployeeName'),
                field: 'employeeName',
                flex:1
            },
			{
                headerName: this.l('TableName'),
                headerTooltip: this.l('TableName'),
                field: 'tableName',flex:1
            },
			{
                headerName: this.l('TimeIn'),
                headerTooltip: this.l('TimeIn'),
                field: 'timeIn',valueGetter: (params) => this.pipe.transform(params.data?.timeIn, 'dd/MM/yyyy HH:mm:ss'),
                flex:1
            },
			{
                headerName: this.l('TimeOut'),
                headerTooltip: this.l('TimeOut'),
                field: 'timeOut',valueGetter: (params) => this.pipe.transform(params.data?.timeOut,'dd/MM/yyyy HH:mm:ss'),
                flex:1
            },
			{
                headerName: this.l('Status'),
                headerTooltip: this.l('Status'),
                field: 'status',
                flex:1
            },
			
        ];
        this.defaultColDef = {
            floatingFilter: true,
            sortable: true,
            resizable: true,
            wrapText: true,
            autoHeight: true,
        };
		this.frameworkComponents = {

            agCellButtonComponent: AgCellButtonRendererComponent,
        };
    }

    ngOnInit(): void {
        this.paginationParams = { pageNum: 1, pageSize: 500, totalCount: 0 };
        this.listEmployeeType.push({ value: -1, label: this.l("All") });
		this._service.getListEmployee().subscribe((result) => {
			result.forEach((e) => {
				this.listEmployeeType.push({ value: e.id, label: e.employeeName });
			})
		})
        this.listTableType.push({ value: -1, label: this.l("All") });
		this._service.getListTable().subscribe((result) => {
			result.forEach((e) => {
				this.listTableType.push({ value: e.id, label: e.tableName });
			})
		})

    }



    
    getAllInvoice(paginationParams?: PaginationParamsModel) {
        return this._service.getAll(
            this.EmployeeId ?? -1,
            this.TableId ?? -1,
            paginationParams ? paginationParams.sorting : '',
            paginationParams ? paginationParams.skipCount : 0,
            paginationParams ? paginationParams.pageSize : 20)
    }
    onGridReady(paginationParams: PaginationParamsModel) {
        this.isLoading = true;
        this.paginationParams = paginationParams;
        this.paginationParams.skipCount = (this.paginationParams.pageNum - 1) * this.paginationParams.pageSize;
        this.getAllInvoice(this.paginationParams).pipe(finalize(() => {
            this.isLoading = false;
            this.selectedInvoice = new SalesInvoiceForViewDto();
        })).subscribe((result) => {
            this.paginationParams.totalCount = result.totalCount;
            this.rowData = result.items;
            this.paginationParams.totalPage = ceil(result.totalCount / this.paginationParams.pageSize);
        });
    }

    onChangeSelection(params: GridParams) {
        const selected = params?.api.getSelectedRows()[0] ?? new SalesInvoiceForViewDto();
        this.selectedInvoice = Object.assign({},selected);
   }
    callBackOracleInvoiceBatchNameGrid(params: GridParams) {
        this.paginationParams.pageNum = 1;
        this.oracleInvoiceBatchName = params;
        this.onGridReady(this.paginationParams);
    }
    clearTextSearch() { 
       this.EmployeeId = -1;
       this.TableId = -1;
       this.search();
    }

    
	search() {
		this.paginationParams = { pageNum: 1, pageSize: 10000, totalCount: 0 };
		this.onGridReady(this.paginationParams);
	}

    changePage(paginationParams: PaginationParamsModel) {
        this.onGridReady(paginationParams);
    }

    exportToExcel(): void {
      
    }



}