import { trim } from 'lodash';
import { BsDatepickerContainerComponent, BsDatepickerDirective } from 'ngx-bootstrap/datepicker';
import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'moment';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Injector } from '@angular/core';

@Component({
	selector: 'tmss-datepicker',
	templateUrl: './tmss-datepicker.component.html',
	styleUrls: ['./tmss-datepicker.component.less'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TmssDatepickerComponent),
			multi: true
		}]
})
export class TmssDatepickerComponent extends AppComponentBase implements ControlValueAccessor, OnInit {
	@ViewChild('datepicker', { static: false }) datepicker!: BsDatepickerDirective;
	@ViewChild('input', { static: false }) input!: ElementRef;

	@Input() defaultValue: Date = undefined;
	@Input() className: string = '';
	@Input() addOnMinWidth: string = '';
	@Input() text: string = '';
	@Input() isValidate: boolean = false;
	@Input() isRequired: boolean = false;
	@Input() minDate!: Date;
	@Input() maxDate!: Date;
	@Input() showMonth: boolean = false;
	@Input() showDeleteBtn: boolean = false;
	@Input() dateInputFormat: string = 'DD/MM/YYYY';
	private onChange!: Function;
	@Input() isDisabled: boolean = false;
	@Input() value: Date = undefined;
	@Input() hasTimePicker: boolean = false;
	@Input() placementDatePicker = 'bottom'; //Hiển thị datePicker trên hoặc dưới ô Input
	@Input() minMode: string = 'day';
	inputValue = null;
	hour: string = new Date().getHours().toString();
	minute: string = new Date().getMinutes().toString();
	@Input() disabledStageDates = [];
  @Input() minYear = 1970;
	datesEnabled = [];

    count = 0;

	constructor(
		injector: Injector) {
		super(injector);
	}
	registerOnTouched(fn: any): void {
	}

	ngOnInit() {
		document.addEventListener('click', event => {
			if (!this.input.nativeElement.contains(event.target)) {
				this.datepicker.hide();
			}
		});
	}

    focusout(){
        if (this.value === null){
            this.datepicker.bsValueChange.emit(this.inputValue ?? this.value);
            let temp = this.inputValue ?? this.value;
            let date = undefined;
            try{
                date = temp.getDate()  + '/' +  (temp.getMonth()+1)  + '/' +  temp.getFullYear();
                setTimeout(()=>{
                    if( date.toString() == "01/01/1970"  ||date.toString() == "1/1/1970" || date.toString() == "undefined/NaN/undefined"){
                        this.inputValue = new Date();
                        this.hour = new Date().getHours().toString();
                        this.minute = new Date().getMinutes().toString();
                    }
                    var tempDate = this.inputValue;
                    this.value = tempDate;
                    this.inputValue = undefined;
                },100);
            } catch (err) {
                // console.error(err);
            }
            // let date = temp ?  (temp.getDate()  + '/' +  (temp.getMonth()+1)  + '/' +  temp.getFullYear()) : "1/1/1970";

        }
        setTimeout(()=>{
            this.onChange(this.value)
        },101)
    }

    clickinput(){
        if (this.input.nativeElement == document.activeElement && this.value === null){
            this.datepicker.bsValueChange.emit(this.inputValue ?? this.value);
            let temp = this.inputValue ?? this.value;
            let date = undefined;
            try{
                date = temp.getDate()  + '/' +  (temp.getMonth()+1)  + '/' +  temp.getFullYear();
                setTimeout(()=>{
                    if(date.toString() == "01/01/1970"  || date.toString() == "1/1/1970" || date.toString() == "undefined/NaN/undefined"){
                        this.inputValue = new Date();
                        this.hour = new Date().getHours().toString();
                        this.minute = new Date().getMinutes().toString();
                    }
                    var tempDate = this.inputValue;
                    this.value = tempDate;
                    this.inputValue =  undefined;
                },100);
            } catch (err) {
                // console.error(err);
            }
            // let date = temp ?  (temp.getDate()  + '/' +  (temp.getMonth()+1)  + '/' +  temp.getFullYear()) : "1/1/1970";

        }
        setTimeout(()=>{
            this.onChange(this.value)
        },101)
    }

	keydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (!this.inputValue || this.inputValue.toString() === 'Invalid Date') {
				this.inputValue = new Date();
				this.hour = new Date().getHours().toString();
				this.minute = new Date().getMinutes().toString();
			}
			this.value = this.inputValue;

		}
		// if (e.key === 'Control' || e.key === 'Alt') {
		// 	this.datepicker.bsValueChange.emit(this.inputValue ?? this.value);
		// }
        this.onChange(this.value)
	}

	//#region --  thay đổi trên control
	inputChange(event: InputEvent) {
		let value = event.target['value'] ? moment(event.target['value'], 'DD/MM/YYYY hh:mm').toDate() : undefined;
		if (event.target['value'].length === 7) value = moment(`01/${event.target['value']}`, 'DD/MM/YYYY hh:mm').toDate();
		if (event.target['value'].length === 4) value = moment(`01/01/${event.target['value']}`, 'DD/MM/YYYY hh:mm').toDate();
		this.hour = value ? value.getHours().toString() : new Date().getHours().toString();
		this.minute = value ? value.getMinutes().toString() : new Date().getMinutes().toString();
		this.inputValue = value;
        // this.onChange(value);
	}
	//#endregion

	//#region --  Thay đổi trên date picker
	bsValueChange(val?: any) { // Thay đổi trên control
            this.count +=1;
            if (this.count <= 10){
                if (val != null) {
                    if (val?.getFullYear() < this.minYear) val?.setYear(this.minYear);
                    val?.setHours(this.hour == 'NaN' ? new Date().getHours() : Number(this.hour) ?? new Date().getHours());
                    val?.setMinutes(this.minute == 'NaN' ? new Date().getMinutes() : Number(this.minute) ?? new Date().getMinutes());
                    // if (typeof this.onChange === 'function' && (moment(this.inputValue).date() !== moment(val).date() || (this.hasTimePicker && this.inputValue !== val ))){
                    //     this.inputValue = val;
                    //     this.onChange(val);
                    // }
                    // this.value = val;
                    if (typeof this.onChange === 'function') this.onChange(val);
                    this.value = val;

                    // this.hour = val ? val.getHours().toString() : new Date().getHours().toString();
                    // this.minute = val ? val.getMinutes().toString() : new Date().getMinutes().toString();
                    // this.value = val;
                    // this.inputValue = val;

                } else if (typeof this.onChange === 'function') {
                    this.hour = `0${new Date().getHours().toString()}`.slice(-2);
                    this.minute = `0${new Date().getMinutes().toString()}`.slice(-2);
                    //if (moment(this.inputValue).date() != moment(val).date() || (this.hasTimePicker && this.inputValue != val ))this.onChange(undefined);
                    this.onChange(undefined);

                }
            }
            else {
                this.count = 0
            }

	}

	onChangeTimeInput(event: any, field: any) {
		if (isNaN(event.target.value)) return this.notify.warn(this.l('NotValid', this.l('Time')));
		const value = Number(event.target.value);
		if (!(this.value instanceof Date)) this.value = this.value ? new Date(this.value) : new Date();

		if (field === 'minute') {
			this.minute = `0${value % 60}`.slice(-2);
			this.hour = `0${Number(this.hour) + Math.floor(value / 60)}`.slice(-2);
			this.value.setHours(Number(this.hour), Number(this.minute));
		}
	}
	//#endregion

    getTimeZone() {
        const localeTimezone = abp.localization.currentLanguage;
        if (localeTimezone.name === 'vi') return 'Asia/Ho_Chi_Minh';
        if (localeTimezone.name === 'en') return 'America/New_York';
        if (localeTimezone.name === 'es-MX') return 'Mexico';
        if (localeTimezone.name === 'es') return 'Spain';
        return '';
      }

	writeValue(val: any) {
		setTimeout(()=>{
            this.value = val ?? this.defaultValue;
            if (!val && !this.defaultValue) return this.datepicker?.bsValueChange.emit(undefined);;
            const dateValue = new Date(Date.parse(moment(val ?? this.defaultValue).tz(this.getTimeZone())?.format('YYYY-MM-DDTHH:mm:ss')));
            this.value = dateValue;
            if (this.hasTimePicker && typeof this.value.getHours === 'function') {
                this.hour = `0${this.value?.getHours().toString()}`.slice(-2);
                this.minute = `0${this.value?.getMinutes().toString()}`.slice(-2);
            }

            this.datepicker?.bsValueChange.emit(dateValue);
        },100)
	}

	registerOnChange(fn: Function) {
		this.onChange = fn;
	}

	setDisabledState(isDisabled: boolean) {
		this.isDisabled = isDisabled || false;
	}

	hideDatePicker(event: BsDatepickerContainerComponent) {
		event._stopPropagation;
		event.containerClass = `${event.containerClass} display-none`
	}

	openDatePicker() {
        if (!this.value && !this.inputValue) {
            this.hour = `0${new Date().getHours().toString()}`.slice(-2);
			this.minute = `0${new Date().getMinutes().toString()}`.slice(-2);
        }
        if(this.disabledStageDates?.length > 0){
			let current = new Date(this.disabledStageDates[0]);
			let endDate = new Date(this.disabledStageDates[1]);
			while(current <= endDate){
				this.datesEnabled.push(new Date(current));
				current.setDate(current.getDate() + 1);
			}
		}
		this.datepicker._bsValue = this.value ?? new Date();
		setTimeout(() => {
			this.datepicker.show();
			const array = Array.from(document.getElementsByClassName('bs-datepicker'));
			array.forEach(e => e.setAttribute('style', 'display: block; margin-right: 5vw;'));
		}, 0);
		if (this.hasTimePicker) {
			setTimeout(() => {
				this.createTimeChoosingComponent();
			});
			setTimeout(() => {
				document.getElementById('hourControl')?.focus();
			});
		}
	}

	createTimeChoosingComponent() { // Tạo 2 ô tính giờ ở cuối khi date picker được show ra
		const currentHour = `0${new Date().getHours()}`.slice(-2);
		const currentMinute = `0${new Date().getMinutes()}`.slice(-2);
		if (!this.value) this.value = this.datepicker._bsValue;

		this.hour = `0${Number(this.hour) % 24}`.slice(-2);
		this.minute = `0${Number(this.minute) % 60}`.slice(-2);

		this.hour = isNaN(Number(this.hour)) || !this.value ? `${currentHour}` : this.hour;
		this.minute = isNaN(Number(this.minute)) || !this.value ? `${currentMinute}` : this.minute;

		let container = document.getElementsByClassName('.bs-datepicker');

		if (container[0]) {
			if (this.placementDatePicker === 'top') {
				container[0].setAttribute('style', 'position: relative !important; top: -28px; display: block;');
			} else container[0].setAttribute('style', 'display: block;');
		}

		let elem = document.querySelector('.bs-datepicker-container');
		let div = document.createElement('div');
		elem?.appendChild(div);
		div.className = 'custom-content';
		div.setAttribute('style', ' padding-top: 12px; padding-left: 5px;width: 280px; height: 65px; left: 0px; background: white; position: absolute; box-shadow: 0 2px 4px 0 #aaa; display: flex; align-items: center;');



		let div1 = document.createElement('div');
		div1.setAttribute('style', 'width: 35px; height: 65px; margin-right: 5px; left: 6px; text-align: center;');
		let div2 = document.createElement('div');
		div2.setAttribute('style', 'width: 35px; height: 65px; margin-right: 5px; left: 6px; text-align: center;');
		let div3 = document.createElement('div');
		div3.setAttribute('style', 'width: 15px; height: 65px; left: 45px;padding-top: 16px;padding-left: 4px');

		let arrowUpHour = document.createElement('i');
		arrowUpHour.setAttribute('class', 'fas fa-caret-up');
		let arrowDownHour = document.createElement('i');
		arrowDownHour.setAttribute('class', 'fas fa-caret-down');

		div.appendChild(div1);
		div.appendChild(div3);
		div.appendChild(div2);

        let increaseHourButton = document.createElement('button');
		increaseHourButton.setAttribute('style', 'width: 35px; height: 15px; margin-right: 5px; left: 6px; text-align: center;display: grid;cursor:pointer; border:none');


		increaseHourButton.appendChild(arrowUpHour)
        let decreaseHourButton = document.createElement('button');
		decreaseHourButton.setAttribute('style', 'width: 35px; height: 15px; margin-right: 5px; left: 6px; text-align: center;display: grid;cursor:pointer; border:none');

		decreaseHourButton.appendChild(arrowDownHour)

        div1.appendChild(increaseHourButton);

        // input chọn giờ
		let hourControl = document.createElement('input');
		hourControl.setAttribute('id', 'hourControl');
		hourControl.setAttribute('style', 'width: 35px; height: 25px; margin-right: 5px; text-align: center; ');
		hourControl.setAttribute('value', this.hour);
		hourControl.className = 'hour-control';
		hourControl.onchange = e => {
			const value = e.target['value'];
			this.hour = value < 10 ? `0${value}` : value.toString();
			this.value.setHours(Number(this.hour), Number(this.minute));

			e.preventDefault();
		};



        var  timeout, interval;
        function clearTimers() {
            clearTimeout(timeout);
            clearInterval(interval);
        }
		increaseHourButton.onmousedown = e => {
            timeout = setTimeout(function() {
                interval = setInterval(function() {
                    this.hour = ((parseInt(hourControl.value) + 1) < 10  && (parseInt(hourControl.value) + 1) >= 0 ) ? `0${(parseInt(hourControl.value) + 1)}` :  (parseInt(hourControl.value) + 1).toString();
                    if (this.hour == '25') this.hour = '00';
                    hourControl.value = this.hour;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
                }, 50);
              }, 300);
		}
        increaseHourButton.onclick = e => {
            this.hour = ((parseInt(hourControl.value) + 1) < 10  && (parseInt(hourControl.value) + 1) >= 0 ) ? `0${(parseInt(hourControl.value) + 1)}` :  (parseInt(hourControl.value) + 1).toString();
            if (this.hour == '25') this.hour = '00';
            hourControl.value = this.hour;
            this.value?.setHours(Number(this.hour), Number(this.minute));
            e.preventDefault()
		}
        increaseHourButton.addEventListener('mouseup', clearTimers);
        increaseHourButton.addEventListener('mouseleave', clearTimers);

		decreaseHourButton.onmousedown = e => {
            timeout = setTimeout(function() {
                interval = setInterval(function() {
                    this.hour = ((parseInt(hourControl.value) - 1) < 10  && (parseInt(hourControl.value) - 1) >= 0 ) ? `0${(parseInt(hourControl.value) - 1)}` :  (parseInt(hourControl.value) - 1).toString();
                    if (this.hour == '-1') this.hour = '24';
                    hourControl.value = this.hour;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
                }, 50);
              }, 300);
		}
        decreaseHourButton.onclick = e => {
            this.hour = ((parseInt(hourControl.value) - 1) < 10  && (parseInt(hourControl.value) - 1) >= 0 ) ? `0${(parseInt(hourControl.value) - 1)}` :  (parseInt(hourControl.value) - 1).toString();
            if (this.hour == '-1') this.hour = '24';
            hourControl.value = this.hour;
            this.value?.setHours(Number(this.hour), Number(this.minute));
            e.preventDefault()
		}
        decreaseHourButton.addEventListener('mouseup', clearTimers);
        decreaseHourButton.addEventListener('mouseleave', clearTimers);

		div1.appendChild(hourControl);
		div1.appendChild(decreaseHourButton);

        // dấu :
		let strongTag = document.createElement('strong');
		strongTag.className = 'text-strong';
		// strongTag.setAttribute('style', ' left: 45px;');
		strongTag.innerHTML = ':';
		div3.appendChild(strongTag);

        //input chọn phút

		let arrowUpMinute = document.createElement('i');
		arrowUpMinute.setAttribute('class', 'fas fa-caret-up');
		let arrowDownMinute = document.createElement('i');
		arrowDownMinute.setAttribute('class', 'fas fa-caret-down');

		let increaseMinuteButton = document.createElement('button');
		increaseMinuteButton.setAttribute('style', 'width: 35px; height: 15px; margin-right: 5px; left: 6px; text-align: center;display: grid; cursor:pointer; border:none');
		increaseMinuteButton.appendChild(arrowUpMinute)
        let decreaseMinuteButton = document.createElement('button');
		decreaseMinuteButton.setAttribute('style', 'width: 35px; height: 15px; margin-right: 5px; left: 6px; text-align: center;display: grid; cursor:pointer; border:none');
		decreaseMinuteButton.appendChild(arrowDownMinute)

		div2.appendChild(increaseMinuteButton);
		let minuteControl = document.createElement('input');
		minuteControl.className = 'minute-control'
		minuteControl.setAttribute('style', 'width: 35px; height: 25px; text-align: center;');
		minuteControl.setAttribute('value', this.minute);
		minuteControl.onchange = event => this.onChangeTimeInput(event, 'minute');
		minuteControl.onkeydown = e => {
			if ((e.key === 'Tab' || e.key === 'Enter') && !e.shiftKey && !e.altKey) {
				this.value?.setHours(Number(this.hour), Number(this.minute));
				this.datepicker.bsValueChange.emit(new Date(this.value));
				this.datepicker.hide();
			}
		};

		increaseMinuteButton.onmousedown = e => {
            timeout = setTimeout(function() {
                interval = setInterval(function() {
                    this.minute = ((parseInt(minuteControl.value) + 1) < 10  && (parseInt(minuteControl.value) + 1) >= 0 ) ? `0${(parseInt(minuteControl.value) + 1)}` :  (parseInt(minuteControl.value) + 1).toString();
                    if (this.minute == '61') this.minute = '00';
                    minuteControl.value = this.minute;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
                }, 50);
              }, 300);
		}
        increaseMinuteButton.onclick = e => {
            this.minute = ((parseInt(minuteControl.value) + 1) < 10  && (parseInt(minuteControl.value) + 1) >= 0 ) ? `0${(parseInt(minuteControl.value) + 1)}` :  (parseInt(minuteControl.value) + 1).toString();
                    if (this.minute == '61') this.minute = '00';
                    minuteControl.value = this.minute;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
		}
        increaseMinuteButton.addEventListener('mouseup', clearTimers);
        increaseMinuteButton.addEventListener('mouseleave', clearTimers);

		decreaseMinuteButton.onmousedown = e => {
            timeout = setTimeout(function() {
                interval = setInterval(function() {
                    this.minute = ((parseInt(minuteControl.value) - 1) < 10  && (parseInt(minuteControl.value) - 1) >= 0 ) ? `0${(parseInt(minuteControl.value) - 1)}` :  (parseInt(minuteControl.value) - 1).toString();
                    if (this.minute == '-1') this.minute = '60';
                    minuteControl.value = this.minute;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
                }, 50);
              }, 300);
		}
        decreaseMinuteButton.onclick = e => {
            this.minute = ((parseInt(minuteControl.value) - 1) < 10  && (parseInt(minuteControl.value) - 1) >= 0 ) ? `0${(parseInt(minuteControl.value) - 1)}` :  (parseInt(minuteControl.value) - 1).toString();
                    if (this.minute == '-1') this.minute = '60';
                    minuteControl.value = this.minute;
                    this.value?.setHours(Number(this.hour), Number(this.minute));
                    e.preventDefault()
		}
        decreaseMinuteButton.addEventListener('mouseup', clearTimers);
        decreaseMinuteButton.addEventListener('mouseleave', clearTimers);

		div2.appendChild(minuteControl);
		div2.appendChild(decreaseMinuteButton);
        hourControl.onkeyup = e => {
			if (e.key === 'Enter') {
				this.datepicker.bsValueChange.emit(new Date(this.value));
				this.datepicker.hide();
			};
		};

        hourControl.onkeydown = e => {
            if (e.key === 'Tab') {
                setTimeout(() => {
                    e.preventDefault();
                    minuteControl.select();
                });
            }
        }
	}

	hidden() {
		if (!this.value) {
			const value = new Date(this.datepicker._bsValue);
			if (!isNaN(Number(this.hour)) && !isNaN(Number(this.minute))) value.setHours(Number(this.hour), Number(this.minute));
			this.datepicker.bsValueChange.emit(value);
		}

		if (this.value?.getHours() === Number(this.hour) && this.value.getMinutes() === Number(this.minute)
		) this.datepicker.bsValueChange.emit(this.value);
		this.input?.nativeElement.focus();
	}
}
