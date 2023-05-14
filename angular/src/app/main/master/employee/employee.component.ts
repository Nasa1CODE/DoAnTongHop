import { Component, Injector, OnInit, ViewChild } from "@angular/core";
import { AppComponentBase } from "@shared/common/app-component-base";
import { PaginationParamsModel } from "@shared/common/models/models.model";
import { CreateOrEditMstEmployeeDto, MstSleEmployeeServiceProxy, MstSleTableServiceProxy, MstTableDto } from "@shared/service-proxies/service-proxies";
import { ceil } from "lodash";
import { Paginator } from "primeng/paginator";
import { finalize } from "rxjs/operators";
import { CreateOrEditEmployeeComponent } from "./create-or-edit-employee.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";


@Component({
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.less'],
})
export class EmployeeComponent extends AppComponentBase implements OnInit {
  
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    @ViewChild('createOrEditMstEmployee', { static: true }) createOrEditMstEmployee: CreateOrEditEmployeeComponent;
    paginationParams: PaginationParamsModel = {
        pageNum: 1,
        pageSize: 500,
        totalCount: 0,
        skipCount: 0,
        sorting: '',
        totalPage: 1,
    };

    rowSelection:any;
    selectedRow: CreateOrEditMstEmployeeDto = new CreateOrEditMstEmployeeDto();
    datas: MstTableDto = new MstTableDto();
    isLoading: boolean = false;
    rowData: any[] = [];
    filter: string = '';
    employeeNameFilter: string = '';
    positionFilter: string = '';
    phoneNumberFilter: string = '';
    adrressEmployeeFilter: string = '';
    emailEmployeeFilter: string = '';
    bsModalRef: BsModalRef;

    constructor(
        injector: Injector,
        private _service: MstSleEmployeeServiceProxy,
        private modalService: BsModalService
    ) {
        super(injector);
       
    }

    ngOnInit(): void {
        this.searchDatas();
    }

    searchDatas(): void {
        this.isLoading = true;
        this._service.getAll(
			this.employeeNameFilter,
			this.positionFilter,
            this.phoneNumberFilter,
            this.adrressEmployeeFilter,
            this.emailEmployeeFilter,
			'',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
        )
        .subscribe((result) => {
            this.isLoading = false;
            this.paginationParams.totalCount = result.totalCount;
            this.rowData = result.items;
            this.paginationParams.totalPage = ceil(result.totalCount / (this.paginationParams.pageSize ?? 0));
        });
    }

    clearTextSearch() { 
        this.emailEmployeeFilter = '';
        this.positionFilter = '';
        this.phoneNumberFilter = '';
        this.adrressEmployeeFilter = '';
        this.emailEmployeeFilter = '';
        this.searchDatas();
    }

    onRowSelect(event) {
        const selectedRow = event.data;
        this.selectedRow = selectedRow;
    }

    getDatas() {

        return this._service.getAll(
            this.employeeNameFilter,
			this.positionFilter,
            this.phoneNumberFilter,
            this.adrressEmployeeFilter,
            this.emailEmployeeFilter,
			'',
            this.paginationParams.skipCount,
            this.paginationParams.pageSize
        ); 
       
        
    }   

    deleteRow(system: CreateOrEditMstEmployeeDto): void {
        console.log(system.id);
        this.message.confirm(this.l('AreYouSure'), 'Delete', (isConfirmed) => {
            if (isConfirmed) {
                this._service.delete(system.id).subscribe(() => {
                    this.searchDatas();
                    this.notify.success(this.l('SuccessfullyDeleted'));            
                    this.notify.info(this.l('SuccessfullyDeleted'));
                    this.isLoading = false;
                });
            }
         
        });
    }
    exportToExcel(): void {
      
    }
    create(){
        this.createOrEditMstEmployee.show(undefined);
    }

    editEmployee(){
        this.createOrEditMstEmployee.show(this.selectedRow);
    }
   

}
