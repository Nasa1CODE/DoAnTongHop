import { AllCommunityModules, AllModules, ColDef, IsColumnFunc, Module } from "@ag-grid-enterprise/all-modules";
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { CreateOrEditMstIngredientDto, MstTableDto, SalesInvoiceServiceProxy } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { ClientSideRowModelModule} from "@ag-grid-enterprise/all-modules";

@Component({
    templateUrl: './invoice.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./invoice.component.less'],
    animations: [appModuleAnimation()]
})
export class InvoiceComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    // @ViewChild('CreateOrEditIngredient', { static: true }) CreateOrEditIngredient: CreateOrEditIngredientComponent;
    paginationParams: PaginationParamsModel = {
        pageNum: 1,
        pageSize: 500,
        totalCount: 0,
        skipCount: 0,
        sorting: '',
        totalPage: 1,
    };

    filterText;
    rowSelection:any;
    selectedRow: CreateOrEditMstIngredientDto = new CreateOrEditMstIngredientDto();
    saveSelectedRow: MstTableDto = new MstTableDto();
    datas: MstTableDto = new MstTableDto();
    isLoading: boolean = false;
    rowData: any[] = [];
    filter: string = '';
    ingredientNameFilter: string = '';
    unitIngredientFilter: string = '';
    selecteId: MstTableDto[] = [];

    modules: Module[] = [ClientSideRowModelModule];

    constructor(
        injector: Injector,
        private _service: SalesInvoiceServiceProxy,
    ) {
        super(injector);
       
    }

    ngOnInit(): void {
        this.searchDatas();
    }

    searchDatas(): void {
        this._service.getAll(
            this.filterText,
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
        this.ingredientNameFilter = '';
        this.unitIngredientFilter = '';
        this.searchDatas();
    }


    getDatas() {
        return this._service.getAll(
            this.filterText,
			'',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
            
        );
    }

    onRowSelect(event) {
        const selectedRow = event.data;
        this.selectedRow = selectedRow;
    }

    exportToExcel(): void {
      
    }

    // createIngredient(){
    //     this.CreateOrEditIngredient.show(undefined);
    // }

    // editIngredient(){
    //     this.CreateOrEditIngredient.show(this.selectedRow);
    // }


    columnDefs = [
		{headerName: 'Make', field: 'make' },
		{headerName: 'Model', field: 'model' },
		{headerName: 'Price', field: 'price'}
	];

    rowData_test = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Porsche', model: 'Boxster', price: 72000 }
	];
}