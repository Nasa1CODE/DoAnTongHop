import { Component, EventEmitter, Injector, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMstEmployeeDto, MstSleEmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { EmployeeComponent } from './employee.component';

@Component({
  selector: '/create-or-edit-employee',
  templateUrl: './create-or-edit-employee.component.html',
  styleUrls: ['./create-or-edit-employee.component.less']
})
export class CreateOrEditEmployeeComponent extends AppComponentBase {
  @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective | undefined;
  @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
  active: boolean = false;
  saving: boolean = false;
  rowdata: CreateOrEditMstEmployeeDto = new CreateOrEditMstEmployeeDto();
  notify: any;
  listMajor: any[] = [];

  listPosition = [
		{ value: 0, label: 'Nhân viên' },
		{ value: 1, label: 'Đầu bếp' },
    { value: 2, label: 'Phục vụ' },
	];

  constructor(
    injector: Injector,
    private _mstSleEmployeeServiceProxy: MstSleEmployeeServiceProxy,
    private _mstSleEmployee: EmployeeComponent

  ) {
    super(injector)
  }

  ngOnInit() {

  }

  show(rowdata?: CreateOrEditMstEmployeeDto): void {
    if (!rowdata) this.rowdata = new CreateOrEditMstEmployeeDto();
    else this.rowdata = rowdata;

    this.active = true;
    this.modal.show();
  }

  save(): void {
    this.saving = true;
    this._mstSleEmployeeServiceProxy.createOrEdit(this.rowdata).
      pipe(
        finalize(() => {
          this.saving = false;
        })).subscribe(() => {
          this._mstSleEmployee.searchDatas();
          this.notify.info(this.l("SavedSuccessfully"));
          this.close();
          this.modalSave.emit(null);
          this.rowdata = null;
          this.saving = false;
        });
  }

  close(): void {
    this._mstSleEmployee.searchDatas();
    this.active = false;
    this.modal.hide();
  }

}
