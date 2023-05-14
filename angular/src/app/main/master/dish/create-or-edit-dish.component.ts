import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMstDishDto, CreateOrEditMstEmployeeDto, MstSleDishServiceProxy, MstSleEmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';


@Component({
  selector: '/create-or-edit-dish',
  templateUrl: './create-or-edit-dish.component.html',
  styleUrls: ['./create-or-edit-dish.component.less']
})
export class CreateOrEditDishComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective | undefined;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active: boolean = false;
  saving: boolean = false;
  rowdata: CreateOrEditMstDishDto = new CreateOrEditMstDishDto();
  notify: any;
  listMajor: any[] = [];


  constructor(
    injector: Injector,
    private _serviceProxy: MstSleDishServiceProxy,

  ) {
    super(injector)
  }

  ngOnInit() {

  }

  show(rowdata?: CreateOrEditMstDishDto): void {
    if (!rowdata) this.rowdata = new CreateOrEditMstDishDto();
    else this.rowdata = rowdata;

    this.active = true;
    this.modal.show();
  }

  save(): void {
    this.saving = true;
    this._serviceProxy.createOrEdit(this.rowdata).
      pipe(
        finalize(() => {
          this.saving = false;
        })).subscribe(() => {
         
          this.notify.info(this.l("SavedSuccessfully"));
          this.close();
          this.modalSave.emit(null);
          this.rowdata = null;
          this.saving = false;
        });
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
