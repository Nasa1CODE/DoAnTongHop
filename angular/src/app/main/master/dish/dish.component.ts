import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { MstSleDishServiceProxy, MstSleEmployeeServiceProxy, MstSleTableServiceProxy, MstTableDto } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { finalize } from "rxjs/operators";


@Component({
    templateUrl: './dish.component.html',
    styleUrls: ['./dish.component.less'],
})
export class DishComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    paginationParams: PaginationParamsModel = {
        pageNum: 1,
        pageSize: 500,
        totalCount: 0,
        skipCount: 0,
        sorting: '',
        totalPage: 1,
    };

    rowSelection:any;
    selectedRow: MstTableDto = new MstTableDto();
    saveSelectedRow: MstTableDto = new MstTableDto();
    datas: MstTableDto = new MstTableDto();
    isLoading: boolean = false;
    rowData: any[] = [];
    filter: string = '';
    tableNameFilter;
    tableTypeFilter;
    selecteId: MstTableDto[] = [];
    dishNameFilter;
    priceFilter;



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
        private _service: MstSleDishServiceProxy,
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
			this.dishNameFilter,
			this.priceFilter,
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
    
    this.searchDatas();
    }


    getDatas() {
        return this._service.getAll(
        	this.dishNameFilter,
			this.priceFilter,
            '',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
            
        );
    }

    onChangeRowSelection(params: { api: { getSelectedRows: () => MstTableDto[] } }) {
        this.saveSelectedRow = params.api.getSelectedRows()[0] ?? new MstTableDto();
        this.selectedRow = Object.assign({}, this.saveSelectedRow);
       
    }

   

    deleteRow(system: MstTableDto): void {
        console.log(system.id);
        this.message.confirm(this.l('AreYouSureToDelete'), 'Delete Row', (isConfirmed) => {
            if (isConfirmed) {
                this._service.delete(system.id).subscribe(() => {
                    //this.callBackDataGrid(this.dataParams!);
                    this.notify.success(this.l('SuccessfullyDeleted'));
                    this.notify.info(this.l('SuccessfullyDeleted'));
                });
            }
        });
    }
    exportToExcel(): void {
      
    }
}
