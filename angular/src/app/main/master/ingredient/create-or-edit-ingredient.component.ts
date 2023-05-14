import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMstEmployeeDto, CreateOrEditMstIngredientDto, CreateOrEditMstTableDto, MstSleEmployeeServiceProxy, MstSleIngredientcServiceProxy, MstSleTableServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { IngredientComponent } from './ingredient.component';


@Component({
  selector: '/create-or-edit-ingredient',
  templateUrl: './create-or-edit-ingredient.component.html',
  styleUrls: ['./create-or-edit-ingredient.component.less']
})
export class CreateOrEditIngredientComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective | undefined;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active: boolean = false;
  saving: boolean = false;
  rowData: CreateOrEditMstIngredientDto = new CreateOrEditMstIngredientDto();
  notify: any;
  listMajor: any[] = [];

  constructor(
    injector: Injector,
    private _mstSleServiceProxy: MstSleIngredientcServiceProxy,
    private _ingredientComponent : IngredientComponent

  ) {
    super(injector)
  }

  ngOnInit() {
     
  }

  show(rowdata?: CreateOrEditMstIngredientDto): void {
    if (!rowdata) this.rowData = new CreateOrEditMstIngredientDto();
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
          this._ingredientComponent.searchDatas();
          this.close();
          this.modalSave.emit(null);
          this.rowData = null;
          this.saving = false;
        });
  }

  close(): void {
    this._ingredientComponent.searchDatas();
    this.active = false;
    this.modal.hide();
  }

}
