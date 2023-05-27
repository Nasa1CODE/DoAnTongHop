import { AgFilterComponent } from '@ag-grid-community/angular';
import { IDoesFilterPassParams, IFilterParams, RowNode } from '@ag-grid-enterprise/all-modules';
import { Component } from '@angular/core';

@Component({
    selector: 'app-ag-filter-grid',
    templateUrl: './ag-filter-grid.component.html',
    styleUrls: ['./ag-filter-grid.component.less']
})
export class AgFilterGridComponent implements AgFilterComponent {
    params: IFilterParams;
    filterText!: string;

    agInit(params: IFilterParams): void {
        this.params = params;
    }

    doesFilterPass(params: IDoesFilterPassParams) {
        const value = params.node.data?.reason; // using filter web-survey-cus

        if (this.isFilterActive()) {
            if (!value) return false;
            return value.normalize('NFC').toLowerCase().indexOf(this.filterText.normalize('NFC').toLowerCase()) !== -1;
        }
    }

    isFilterActive() {
        return (
            this.filterText !== null &&
            this.filterText !== undefined &&
            this.filterText !== ''
        );
    }

    getModel() {
        return this.isFilterActive() ? this.filterText : null;
    }

    setModel(model: any) {
        this.filterText = model;
        this.params.filterChangedCallback();
    }

    myMethodForTakingValueFromFloatingFilter(value: any) {
        this.filterText = value;
        this.params.filterChangedCallback();
    }

    onInputBoxChanged(event?: any) {
        this.params.filterChangedCallback();
    }
}
