import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { EntityDynamicParameterValueServiceProxy, GetAllEntityDynamicParameterValuesOutputItem, CleanValuesInput, InsertOrUpdateAllValuesInput, InsertOrUpdateAllValuesInputItem } from '@shared/service-proxies/service-proxies';
import { InputTypeConfigurationDefinition, InputTypeConfigurationService } from '@app/shared/common/input-types/input-type-configuration.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { InputTypeComponentBase } from '@app/shared/common/input-types/input-type-component-base';

export class EntityDynamicParameterValueViewItem {
  data: GetAllEntityDynamicParameterValuesOutputItem;
  definition: InputTypeConfigurationDefinition;
  injector: Injector;
  componentInstance: InputTypeComponentBase;
  constructor(data: GetAllEntityDynamicParameterValuesOutputItem, definition: InputTypeConfigurationDefinition) {
    this.data = data;
    this.definition = definition;
  }
}

@Component({
  selector: 'app-entity-dynamic-parameter-value',
  templateUrl: './entity-dynamic-parameter-value.component.html',
  styleUrls: ['./entity-dynamic-parameter-value.component.css'],
  animations: [appModuleAnimation()]
})
export class EntityDynamicParameterValueComponent extends AppComponentBase implements OnInit {
  entityFullName: string;
  entityId: string;

  initialized = false;
  items: EntityDynamicParameterValueViewItem[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _injector: Injector,
    private _entityDynamicParameterValueService: EntityDynamicParameterValueServiceProxy,
    private _inputTypeConfigurationService: InputTypeConfigurationService
  ) {
    super(_injector);
  }

  ngOnInit() {
    this.showMainSpinner();

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.entityFullName = params['entityFullName'];
        this.entityId = params['rowId'];
        this.initialize();
      },
      (err) => {
        this.hideMainSpinner();
      });
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
        },
        (err) => {
          this.hideMainSpinner();
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

  saveAll(): void {
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
        },
        (err) => {
          this.hideMainSpinner();
        }
      );
  }
}
