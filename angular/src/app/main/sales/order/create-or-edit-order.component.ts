import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import {  MstDishListDto, MstSleEmployeeServiceProxy, SalesOrderInvoiceServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { OrderComponent } from './order.component';

@Component({
  selector: '/create-or-edit-order',
  templateUrl: './create-or-edit-order.component.html',
  styleUrls: ['./create-or-edit-order.component.less']
})
export class CreateOrEditOrderComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective | undefined;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active: boolean = false;
  saving: boolean = false;
  listDishs: MstDishListDto[] = [];
  rowdata;
  notify: any;
  tableId;
  tableName;
  listDishTable: MstDishListDto[] = [];
  listDish:  MstDishListDto = new MstDishListDto();
  constructor(
    injector: Injector,
    private _mstSleEmployeeServiceProxy: MstSleEmployeeServiceProxy,
    private _service: SalesOrderInvoiceServiceProxy,
    private _view: OrderComponent
  ) {
    super(injector)
  }

  ngOnInit() {

  }

  show(tableId: any): void {
    this.tableId = tableId;
    this._service.getDistList(this.tableId).subscribe((result) =>{
      this.listDishs = result;
      this.tableName = result[0].tableName;
    });
    this.active = true;
    this.modal.show();
  }

  save(): void {
    let list = [];
    let listIdDish;
    let tableId;
    this.listDishs.forEach(e => {
        // eslint-disable-next-line eqeqeq
        if (e.checks == true){
            tableId = e.tableId;
            list.push(e.id);
        }
    });
    listIdDish = list.join(',');
    this.saving = true;
    this._service.createOrEditDishTable(listIdDish, tableId)
        .pipe( finalize(() =>  this.saving = false))
        .subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.modal?.hide();
            this.modalSave.emit(this.rowdata);
        });
    this._view.getAllDetail(this.tableId);
    this.saving = false;
  
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
