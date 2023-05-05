import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntityDynamicParameterValueServiceProxy, CleanValuesInput, InsertOrUpdateAllValuesInput, InsertOrUpdateAllValuesInputItem } from '@shared/service-proxies/service-proxies';
import { InputTypeConfigurationService } from '@app/shared/common/input-types/input-type-configuration.service';
import { InputTypeComponentBase } from '@app/shared/common/input-types/input-type-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EntityDynamicParameterValueViewItem } from './entity-dynamic-parameter-value.component';

@Component({
  selector: 'manage-entity-dynamic-parameter-values-modal',
  templateUrl: './manage-entity-dynamic-parameter-values-modal.component.html'
})
export class ManageEntityDynamicParameterValuesModalComponent extends AppComponentBase {
  @ViewChild('manageDynamicEntityParameterValuesModal') modal: ModalDirective;

  entityFullName: string;
  entityId: string;

  initialized = false;
  items: EntityDynamicParameterValueViewItem[];
  loading = true;
  saving = false;

  constructor(
    private _injector: Injector,
    private _entityDynamicParameterValueService: EntityDynamicParameterValueServiceProxy,
    private _inputTypeConfigurationService: InputTypeConfigurationService
  ) {
    super(_injector);
  }

  initialize(): void {
    this.initialized = false;
    this._entityDynamicParameterValueService
      .getAllEntityDynamicParameterValues(this.entityFullName, this.entityId)
      .subscribe(
        (data) => {
          if (data.items) {
            this.items = data.items.map((item) => {
              let definition = this._inputTypeConfigurationService.getByInputType(item.inputType);

              let viewItem = new EntityDynamicParameterValueViewItem(item, definition);

              const componentInstanceCallback = (instance: InputTypeComponentBase) => {
                viewItem.componentInstance = instance;
              };

              let injector = Injector.create(
                [
                  { provide: 'selectedValues', useValue: item.selectedValues },
                  { provide: 'allValues', useValue: item.allValuesInputTypeHas },
                  { provide: 'componentInstance', useValue: componentInstanceCallback },
                ], this._injector);

              viewItem.injector = injector;
              return viewItem;
            });
          }
          this.initialized = true;
          this.hideMainSpinner();
          this.loading = false;
        },
        () => {
          this.hideMainSpinner();
          this.loading = false;
        }
      );
  }

  deleteAllValuesOfEntityDynamicParameterId(item: EntityDynamicParameterValueViewItem): void {
    this.message.confirm(
      this.l('DeleteEntityDynamicParameterValueMessage', item.data.parameterName),
      this.l('AreYouSure'),
      isConfirmed => {
        if (isConfirmed) {
          this._entityDynamicParameterValueService.cleanValues(new CleanValuesInput({
            entityDynamicParameterId: item.data.entityDynamicParameterId,
            entityId: this.entityId
          })).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.initialize();
          });
        }
      }
    );
  }

  private saveAll(): void {
    if (!this.items || this.items.length === 0) {
      return;
    }

    let newItems: InsertOrUpdateAllValuesInputItem[] = [];
    for (let i = 0; i < this.items.length; i++) {
      const element = this.items[i];
      newItems.push(
        new InsertOrUpdateAllValuesInputItem({
          entityDynamicParameterId: element.data.entityDynamicParameterId,
          entityId: this.entityId,
          values: element.componentInstance.getSelectedValues()
        })
      );
    }

    this._entityDynamicParameterValueService
      .insertOrUpdateAllValues(
        new InsertOrUpdateAllValuesInput({
          items: newItems
        })
      )
      .subscribe(
        () => {
          abp.notify.success(this.l('SavedSuccessfully'));
          this.initialize();
          this.hideMainSpinner();
          this.close();
        },
        () => {
          this.hideMainSpinner();
        }
      );
  }

  close(): void {
    this.modal.hide();
  }

  show(entityFullName: string, rowId: string) {
    this.entityFullName = entityFullName;
    this.entityId = rowId;
    this.initialize();
    this.modal.show();
  }
}
