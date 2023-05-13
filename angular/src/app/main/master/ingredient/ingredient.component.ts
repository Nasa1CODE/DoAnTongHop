import { ColDef, IsColumnFunc, Module } from "@ag-grid-enterprise/all-modules";
import { Component, Injector, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { MstSleIngredientcServiceProxy, MstTableDto } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { finalize } from "rxjs/operators";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
    templateUrl: './ingredient.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./ingredient.component.less'],
    animations: [appModuleAnimation()]
})
export class IngredientComponent extends AppComponentBase implements OnInit {
  
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
    ingredientNameFilter: string = '';
    unitIngredientFilter: string = '';
    selecteId: MstTableDto[] = [];

    modules: Module[] = [ClientSideRowModelModule];


    constructor(
        injector: Injector,
        private _service: MstSleIngredientcServiceProxy,
    ) {
        super(injector);
       
    }

    ngOnInit(): void {
        this.searchDatas();
    }

    searchDatas(): void {
        this._service.getAll(
			this.ingredientNameFilter,
			this.unitIngredientFilter,
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
            this.ingredientNameFilter,
			this.unitIngredientFilter,
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
        this.message.confirm(this.l('AreYouSureToDelete'), 'Delete Row', (isConfirmed) => {
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
}