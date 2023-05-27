import { IHeaderAngularComp } from '@ag-grid-community/angular';
import { IHeaderParams } from '@ag-grid-enterprise/all-modules';
import { Component } from '@angular/core';

@Component({
  selector: 'ag-header-button-grid',
  templateUrl: './ag-header-button-grid.component.html',
  styleUrls: ['./ag-header-button-grid.component.less']
})
export class AgHeaderButtonGridComponent implements IHeaderAngularComp {

    public params: any;
    // field: string;
    headerButtonDef: {
        text: string | Function, // Button display text
        iconName: string, // 'fa fa-pencil'
        // tslint:disable-next-line:ban-types
        className: string,
        disabled: boolean | Function, // true => disable button, false => enable button
        message: string,
        // tslint:disable-next-line:ban-types
        function: Function,
        busy: boolean
      };

    agInit(headerParams): void {
        this.params = headerParams;
        // this.field = this.params.colDef.field;
        this.headerButtonDef = this.params.column.colDef.headerButtonDef;
    }
    //------------------------------------------------------------------------------
    customFunction() {
        this.headerButtonDef.function(this.params);
    }

    get displayText() {
        if (typeof this.headerButtonDef.text === 'function') {
          return this.headerButtonDef.text(this.params);
        }
        return this.headerButtonDef.text
      }

    get disableButton() {
        // Execute if type is function
        if (typeof this.headerButtonDef.disabled === 'function') {
          return this.headerButtonDef.disabled(this.params);
        } else {
          return this.headerButtonDef.disabled;
        }
      }

    refresh(): boolean {
        return false;
    }
}
