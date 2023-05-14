import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMstEmployeeDto, CreateOrEditMstTableDto, MstSleEmployeeServiceProxy, MstSleTableServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { TableDishComponent } from './table-dish.component';


@Component({
  selector: '/create-or-edit-table-dish',
  templateUrl: './create-or-edit-table-dish.component.html',
  styleUrls: ['./create-or-edit-table-dish.component.less']
})
export class CreateOrEditTableDishComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective | undefined;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active: boolean = false;
  saving: boolean = false;
  rowData: CreateOrEditMstTableDto = new CreateOrEditMstTableDto();
  notify: any;
  listMajor: any[] = [];

  constructor(
    injector: Injector,
    private _mstSleServiceProxy: MstSleTableServiceProxy,
    private _tableDishComponent : TableDishComponent

  ) {
    super(injector)
  }

  ngOnInit() {
     
  }

  show(rowdata?: CreateOrEditMstTableDto): void {
    if (!rowdata) this.rowData = new CreateOrEditMstTableDto();
    else this.rowData = rowdata;
    console.log(this.rowData);

    this.active = true;
    this.modal.show();
  }

  save(): void {
    this.saving = true;
    this._mstSleServiceProxy.createOrEdit(this.rowData).
      pipe(
        finalize(() => {
          this.saving = false;
        })).subscribe(() => {
          this.notify.info(this.l("SavedSuccessfully"));
          this._tableDishComponent.searchDatas();
          this.close();
          this.modalSave.emit(null);
          this.rowData = null;
          this.saving = false;
        });
  }

  close(): void {
    this._tableDishComponent.searchDatas();
    this.active = false;
    this.modal.hide();
    this.modalSave.emit(false);
  }

}
