import { AllCommunityModules, AllModules, ColDef, IsColumnFunc, Module } from "@ag-grid-enterprise/all-modules";
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { CreateOrEditMstIngredientDto, MstDishDetailDto, MstSleTableServiceProxy, MstTableDto, SalesInvoiceForViewDto, SalesInvoiceServiceProxy, SalesOrderInvoiceServiceProxy } from "@shared/service-proxies/service-proxies";
import { ceil, forEach } from "lodash";
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
import { CreateOrEditOrderComponent } from "./create-or-edit-order.component";

@Component({
    templateUrl: './order.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./order.component.less'],
    animations: [appModuleAnimation()]
})
export class OrderComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
     @ViewChild('CreateOrEditOrderComponent', { static: true }) CreateOrEditOrderComponent: CreateOrEditOrderComponent;
    paginationParams: PaginationParamsModel = { pageNum: 1, pageSize: 20, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 };
    paginationParamsDetail :PaginationParamsModel = { pageNum: 1, pageSize: 20, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 };
    pipe = new DatePipe('en-US');
    dataParamsbyDetail: GridParams | undefined;
    tableColDefs: CustomColDef[] = [];
    detailTableColDefs: CustomColDef[] = [];
    dataParams: GridParams | undefined;
    defaultColDef: CustomColDef;
    filterText;
    rowSelection:any;
    oracleInvoiceBatchName;
    selectedOrder: MstTableDto = new MstTableDto();
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
    rowDataDetail: MstDishDetailDto[] = [];
    listOrderId;
    constructor(
        injector: Injector,
        private _service: MstSleTableServiceProxy,
        private _serviceOrder: SalesOrderInvoiceServiceProxy,
        private gridTableService: GridTableService,
        private _dateTimeService: DateTimeService,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
        this.tableColDefs = [
            {   headerName: this.l('STT'),
                headerTooltip: this.l('STT')
                ,cellRenderer: (params) =>params.rowIndex + 1 + this.paginationParams.pageSize * (this.paginationParams.pageNum - 1)
                ,cellClass: ['text-center']
                ,width: 55,
            },
			{
                headerName: this.l('TableName'),
                headerTooltip: this.l('TableName'),
                field: 'tableName',flex:1
            },
            {
                headerName: this.l('TableType'),
                headerTooltip: this.l('TableType'),
                field: 'tableType',flex:1
            },
            {
                headerName: this.l('AmountPeople'),
                headerTooltip: this.l('AmountPeople'),
                field: 'amountPeople',flex:1
            },
			{
                headerName: this.l('statusTable'),
                headerTooltip: this.l('statusTable'),
                field: 'statusTable',
                flex:1
            },
			
        ];


        this.detailTableColDefs = [
            {   headerName: this.l('STT'),
                headerTooltip: this.l('STT')
                ,cellRenderer: (params) =>params.rowIndex + 1 + this.paginationParams.pageSize * (this.paginationParams.pageNum - 1)
                ,cellClass: ['text-center']
                ,width: 55,
            },
			{
                headerName: this.l('DishName'),
                headerTooltip: this.l('DishName'),
                field: 'dishName',flex:1
            },
            {
                headerName: this.l('DishType'),
                headerTooltip: this.l('DishType'),
                field: 'dishType',flex:1
            },
            {
                headerName: this.l('UnitDish'),
                headerTooltip: this.l('UnitDish'),
                field: 'unitDish',flex:1
            },
            {
                headerName: this.l('Price'),
                headerTooltip: this.l('Price'),
                field: 'price',
                flex:1
            },
			{
                headerName: this.l('StatusDish'),
                headerTooltip: this.l('StatusDish'),
                field: 'statusDish',
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
        // this.listEmployeeType.push({ value: -1, label: this.l("All") });
		// this._service.getListEmployee().subscribe((result) => {
		// 	result.forEach((e) => {
		// 		this.listEmployeeType.push({ value: e.id, label: e.employeeName });
		// 	})
		// })
        this.paginationParamsDetail = { pageNum: 1, pageSize: 500, totalCount: 0 };

    }



    
    getAllInvoice(paginationParams?: PaginationParamsModel) {
        return this._service.getAll(
           '',
           '',
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
            this.selectedOrder = new MstTableDto();
        })).subscribe((result) => {
            this.paginationParams.totalCount = result.totalCount;
            this.rowData = result.items;
            this.paginationParams.totalPage = ceil(result.totalCount / this.paginationParams.pageSize);
        });
    }

    onChangeSelection(params: GridParams) {
        const selected = params?.api.getSelectedRows()[0] ?? new MstTableDto();
        this.selectedOrder = Object.assign({},selected);
        this.listOrderId = selected.id;
        this.getAllDetail(this.listOrderId);
   }
    callBackOracleInvoiceBatchNameGrid(params: GridParams) {
        this.paginationParams.pageNum = 1;
        this.oracleInvoiceBatchName = params;
        this.onGridReady(this.paginationParams);
    }
    clearTextSearch() { 
       this.EmployeeId = -1;
       this.TableId = -1;
    }

    //Dish Detail
    getAllDetail(TableId?: any) {
        this._serviceOrder.getAllDishDetail(
            TableId,
            '',
            this.paginationParamsDetail.skipCount,
            this.paginationParamsDetail.pageSize
        ).subscribe( (result) => {
            this.paginationParamsDetail.totalCount = result.totalCount;
            console.log(this.rowDataDetail);
            this.rowDataDetail = result.items;
            
            this.paginationParamsDetail.totalPage = ceil(result.totalCount / (this.paginationParamsDetail.pageSize ?? 0));
        })
    }

    callBackByDetail(params) {
        this.dataParamsbyDetail = params;
        this.dataParamsbyDetail.api.paginationSetPageSize(
            this.paginationParamsDetail.pageSize
        );
    }
    changePageByDetail(paginationParams) {
        this.paginationParamsDetail = paginationParams;
        this.paginationParamsDetail.skipCount = (paginationParams.pageNum - 1) * paginationParams.pageSize;
        this.getAllDetail(this.listOrderId);
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

    createOrEditOrder(){
        this.CreateOrEditOrderComponent.show(this.listOrderId);
    }

    // getTotalPrice(){
    //     this._serviceOrder.getAllDishDetail()
    // }




}