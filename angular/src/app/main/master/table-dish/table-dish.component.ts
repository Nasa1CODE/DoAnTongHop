import { ColDef, IsColumnFunc, Module } from "@ag-grid-enterprise/all-modules";
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { CreateOrEditMstTableDto, MstSleTableServiceProxy, MstTableDto } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { finalize } from "rxjs/operators";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { CreateOrEditTableDishComponent } from "./create-or-edit-table-dish.component";

@Component({
    templateUrl: './table-dish.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./table-dish.component.less'],
    animations: [appModuleAnimation()]
})
export class TableDishComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createOrEditMstTable', { static: true }) createOrEditMstTable: CreateOrEditTableDishComponent;
    paginationParams: PaginationParamsModel = {
        pageNum: 1,
        pageSize: 500,
        totalCount: 0,
        skipCount: 0,
        sorting: '',
        totalPage: 1,
    };

    rowSelection:any;
    selectedRow: CreateOrEditMstTableDto = new CreateOrEditMstTableDto();
    saveSelectedRow: MstTableDto = new MstTableDto();
    datas: MstTableDto = new MstTableDto();
    isLoading: boolean = false;
    rowData: any[] = [];
    filter: string = '';
    tableNameFilter: string = '';
    tableTypeFilter: string = '';
    selecteId: MstTableDto[] = [];

    modules: Module[] = [ClientSideRowModelModule];

    columnDefs1: ColDef[] = [
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ];

    rowData1 = [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
    ];
    
    defaultColDef = {
        resizable: true,
        sortable: true,
        floatingFilterComponentParams: { suppressFilterButton: true },
        filter: true,
        floatingFilter: true,
        suppressHorizontalScroll: true,
        textFormatter: function (r: any) {
            if (r == null) return null;
            return r.toLowerCase();
        },
        tooltip: (params) => params.value,
    };

    constructor(
        injector: Injector,
        private _service: MstSleTableServiceProxy,
    ) {
        super(injector);
       
    }

    ngOnInit(): void {
        this.paginationParams = { pageNum: 1, pageSize: 20, totalCount: 0 };
        this.searchDatas();
    }

    searchDatas(): void {
        // this.paginator.changePage(this.paginator.getPage());
        this._service.getAll(
			this.tableNameFilter,
			this.tableTypeFilter,
			'',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
        )
        .subscribe((result) => {
            this.paginationParams.totalCount = result.totalCount;
            this.rowData = result.items;
            this.paginationParams.totalPage = ceil(result.totalCount / (this.paginationParams.pageSize ?? 0));
        });
    }

    clearTextSearch() { 
        this.tableNameFilter = '';
        this.tableTypeFilter = '';
        this.searchDatas();
    }


    getDatas() {
        return this._service.getAll(
            this.tableNameFilter,
			this.tableTypeFilter,
			'',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
            
        );
    }

    onRowSelect(event) {
        const selectedRow = event.data;
        this.selectedRow = selectedRow;
    }

    deleteRow(system: MstTableDto): void {
        console.log(system.id);
        this.message.confirm(this.l('AreYouSure'), 'Delete', (isConfirmed) => {
            if (isConfirmed) {
                this._service.delete(system.id).subscribe(() => {
                    this.searchDatas();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                    this.notify.info(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
    exportToExcel(): void {
      
    }

    create(){
        this.createOrEditMstTable.show(undefined);
    }

    editTable(){
        this.createOrEditMstTable.show(this.selectedRow);
    }
   
}