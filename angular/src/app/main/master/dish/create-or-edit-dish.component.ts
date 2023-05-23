import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMstDishDto, CreateOrEditMstEmployeeDto, CreateOrEditMstIngredientDto, CreateOrEditMstTableDto, MstSleDishServiceProxy, MstSleEmployeeServiceProxy, MstSleIngredientcServiceProxy, MstSleTableServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DishComponent } from './dish.component';


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
  rowData: CreateOrEditMstDishDto = new CreateOrEditMstDishDto();
  notify: any;
  listMajor: any[] = [];

  constructor(
    injector: Injector,
    private _mstSleServiceProxy: MstSleDishServiceProxy,
    private _dishComponent : DishComponent

  ) {
    super(injector)
  }

  ngOnInit() {
     
  }

  show(rowdata?: CreateOrEditMstDishDto): void {
    if (!rowdata) this.rowData = new CreateOrEditMstDishDto();
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
          this._dishComponent.searchDatas();
          this.close();
          this.modalSave.emit(null);
          this.rowData = null;
          this.saving = false;
        });
  }

  close(): void {
    this._dishComponent.searchDatas();
    this.active = false;
    this.modal.hide();
  }

}
