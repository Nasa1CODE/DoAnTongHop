import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component } from '@angular/core';

@Component({
  selector: 'ag-cell-button-renderer',
  templateUrl: './ag-cell-button-renderer.component.html',
  styleUrls: ['./ag-cell-button-renderer.component.less']
})
export class AgCellButtonRendererComponent implements ICellRendererAngularComp {
  public params: any;
  field: string;
  buttonDef: {
    text: string | Function, // Button display text
    iconName: string | Function, // 'fa fa-pencil'
    // tslint:disable-next-line:ban-types
    className: string,
    disabled: boolean | Function, // true => disable button, false => enable button
    message: string,
    // tslint:disable-next-line:ban-types
    function: Function,
    busy: boolean,
    visible: boolean | Function,
    tooltip: string
  };
  buttonDefTwo: {
    text: string | Function, // Button display text
    iconName: string | Function, // 'fa fa-pencil'
    // tslint:disable-next-line:ban-types
    className: string,
    disabled: boolean | Function, // true => disable button, false => enable button
    message: string,
    // tslint:disable-next-line:ban-types
    function: Function,
    busy: boolean,
    visible: boolean | Function,
    tooltip: string
  };
  buttonDefThree: {
    text: string | Function, // Button display text
    iconName: string | Function, // 'fa fa-pencil'
    // tslint:disable-next-line:ban-types
    className: string,
    disabled: boolean | Function, // true => disable button, false => enable button
    message: string,
    // tslint:disable-next-line:ban-types
    function: Function,
    busy: boolean,
    visible: boolean | Function,
    tooltip: string
  };

  constructor(
  ) {
  }

  agInit(params) {
    this.params = params;
    this.field = this.params.colDef.field;
    this.buttonDef = this.params.colDef.buttonDef;
    this.buttonDefTwo = this.params.colDef.buttonDefTwo;
    this.buttonDefThree = this.params.colDef.buttonDefThree;
  }
  refresh(): boolean {
    return false;
  }

  get displayText() {
    if (typeof this.buttonDef.text === 'function') {
      return this.buttonDef.text(this.params);
    }
    return this.buttonDef.text
  }
  get displayTextSecondButton() {
    if (typeof this.buttonDefTwo.text === 'function') {
      return this.buttonDefTwo.text(this.params);
    }
    return this.buttonDefTwo.text
  }
  get displayTextThirdButton() {
    if (typeof this.buttonDefThree.text === 'function') {
      return this.buttonDefThree.text(this.params);
    }
    return this.buttonDefThree.text
  }

  get disableButton() {
    // Execute if type is function
    if (typeof this.buttonDef.disabled === 'function') {
      return this.buttonDef.disabled(this.params);
    } else {
      return this.buttonDef.disabled;
    }
  }
  get disableButtonTwo() {
    // Execute if type is function
    if (typeof this.buttonDefTwo.disabled === 'function') {
      return this.buttonDefTwo.disabled(this.params);
    } else {
      return this.buttonDefTwo.disabled;
    }
  }
  get disableButtonThree() {
    // Execute if type is function
    if (typeof this.buttonDefThree.disabled === 'function') {
      return this.buttonDefThree.disabled(this.params);
    } else {
      return this.buttonDefThree.disabled;
    }
  }

  get visibleButton() {
    // Execute if type is function
    if (typeof this.buttonDef.visible === 'function') {
      return this.buttonDef.visible(this.params);
    } else {
      return this.buttonDef.visible;
    }
  }
  get visibleButtonTwo() {
    if (typeof this.buttonDefTwo.visible === 'function') {
      return this.buttonDefTwo.visible(this.params);
    } else {
      return this.buttonDefTwo.visible;
    }
  }
  get visibleButtonThree() {
    if (typeof this.buttonDefThree.visible === 'function') {
      return this.buttonDefThree.visible(this.params);
    } else {
      return this.buttonDefThree.visible;
    }
  }

  get iconNameFunc() {
    if (typeof this.buttonDef.iconName === 'function') {
      return this.buttonDef.iconName(this.params);
    } else {
      return this.buttonDef.iconName;
    }
  }

  get iconNameFuncTwo() {
    if (typeof this.buttonDefTwo.iconName === 'function') {
      return this.buttonDefTwo.iconName(this.params);
    } else {
      return this.buttonDefTwo.iconName;
    }
  }
  get iconNameFuncThree() {
    if (typeof this.buttonDefThree.iconName === 'function') {
      return this.buttonDefThree.iconName(this.params);
    } else {
      return this.buttonDefThree.iconName;
    }
  }

  customFunction() {
    this.buttonDef.function(this.params);
  }

  customFunctionTwo() {
    this.buttonDefTwo.function(this.params);
  }
  customFunctionThree() {
    this.buttonDefThree.function(this.params);
  }
}