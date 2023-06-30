import { finalize } from 'rxjs/operators';
import { CustomColDef, GridParams, PaginationParamsModel } from './../../models/base.model';
import { GridTableService } from './../../services/grid-table.service';
import {
    Component,
    OnInit,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    Injector,
    ChangeDetectorRef,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ceil } from 'lodash';
import { GridApi } from '@ag-grid-enterprise/all-modules';

@Component({
    selector: 'tmss-select-grid-modal',
    templateUrl: './tmss-select-grid-modal.component.html',
    styleUrls: ['./tmss-select-grid-modal.component.less'],
})
export class TmssSelectGridModalComponent extends AppComponentBase
    implements OnInit {
    @ViewChild('modal', { static: false }) modal!: ModalDirective;
    @Output() close = new EventEmitter();
    @Output() cancel = new EventEmitter();
    @Output() setLoading: EventEmitter<any> = new EventEmitter();
    @Input() headerText!: string;
    @Input() modalClass: string = 'tmss-modal-md';
    @Input() showPagination: boolean = true;
    @Input() apiCall!: Function;
    @Input() isHideSearchField!: boolean;
    @Input() value!: any;
    @Input() columnDefs!: Array<any>;
    @Input() height!: number;
    @Input() listInput: any;
    @Input() enableFilter: boolean = false;
    @Input() defaultColDef: CustomColDef =  {
        flex: 1
    };
    @Input() showInput: boolean = true;
    @Input() hideSaveButton!: boolean;
    @Input() hideCancelButton!: boolean;
    @Input() alwaysShowModal: boolean = false;
    @Input() rowSelection: string = 'single';
    @Input() upperCaseSearchValue: boolean = false;

    @Input() textLeft = this.l('Save');
    @Input() textRight = this.l('Cancel');

    @Input() showColorAppointment = false;
    @Input() showBsModal = false;

    totalCount = 0;

    @Input() notPartFilter = false;
    dataStorage!: any[];
    pagedList!: any[];
    gridApi!: GridApi;
    params: GridParams | undefined;
    gridColumnApi: any;
    paginationParams: PaginationParamsModel = { pageNum: 1, pageSize: 10, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 };

    list: any[] = [];
    totalPages!: number;
    frameworkComponents!: any;
    selectedData!: any;
    filterName: any | undefined;
    @Input() isClosedWhenChooseData = true;
    @Input() isShowRowNum = false;

constructor(
        injector: Injector,
        private gridTableService: GridTableService,
        private cdr: ChangeDetectorRef
    ) {
        super(injector);
    }

    ngOnInit() {
    }

    callBackGrid(params: GridParams) {
        this.params = params;
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.paginationSetPageSize(this.paginationParams?.pageSize);
    }

    enterEvent(event: { keyCode: number; }) {
        if (event.keyCode === 13) this.confirm();
    }

    async search(value?: any) {
        if(!this.notPartFilter)
        {
            var format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
            value = value?.split(' ')[0].split('').filter(e => !format.test(e)).join('').trim();
        };
        // truyen api
        this.value = this.upperCaseSearchValue ? (value?.toString().toUpperCase() ?? '') : (value ?? '');
        if (this.apiCall && !this.isHideSearchField) {
            const api = !this.paginationParams
                ? this?.apiCall(this.value)
                : this?.apiCall(this.value, {
                    sorting: this.paginationParams.sorting ?? '',
                    skipCount: this.paginationParams.skipCount ?? 0,
                    pageSize: this.paginationParams.pageSize ?? 10,
                });
            await api
                .pipe(finalize(() => this.setLoading.emit(false))).subscribe((result: any) => {
                this.setLoading.emit(true);
                if (result && result.items) {
                    this.list = result.items;
                    this.totalPages = ceil(
                        result.totalCount / (this.paginationParams.pageSize ?? 10)
                    );
                    this.paginationParams.totalCount = result.totalCount;
                    this.paginationParams.totalPage = this.totalPages;
                    //Set page 0 by default
                    this.paginationParams.pageNum = 1;
                } else {
                    this.list = result;
                    this.totalCount = this.list?.length ?? 0;
                }
            },
            (err: { error: string; }) => this.notify.error(err.error),
            () => {
                if (!this.modal.isShown) {
                    if (this.list?.length === 0 && this.filterName === 'Mã PT') {
                        this.notify.warn(`${this.filterName} không tồn tại`);
                        this.cdr.detectChanges();
                        this.modal.show();
                        this.cdr.detectChanges();
                    }
                    else if (this.alwaysShowModal) { this.cdr.detectChanges(); this.modal.show(); this.cdr.detectChanges();}
                    else if (this.list && this.list.length === 1)  {
                        this.close.emit(this.list[0]);
                    }
                    else if (this.list?.length === 0)
                    {
                        this.notify.warn('Thông tin tìm kiếm khống tồn tại');
                        this.close.emit(undefined);
                    }
                    else {
                        this.cdr.detectChanges();
                        this.modal.show();
                        this.cdr.detectChanges();
                        setTimeout(() => {
                            this.selectedData = undefined;
                            this.gridApi.setRowData(this.list);
                            this.gridTableService.selectFirstRow(this.gridApi);
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        this.selectedData = undefined;
                        this.gridApi.setRowData(this.list);
                        this.gridTableService.selectFirstRow(this.gridApi);
                    }, 500);
                }
                this.setLoading.emit(false);
            });
            return await null;
        }

        //  truyen list
        setTimeout(() => {
            this.list = this.dataStorage.filter(e => e[this.filterName.toString()] ? e[this.filterName.toString()].toString().includes(value ?? '') : ''.includes(value));
            this.gridApi?.setRowData(this.list);
            this.totalPages = ceil(
                this.list ?
                    this.list.length / (this.paginationParams.pageSize ?? 10)
                    : 0
            );
            this.paginationParams.pageNum = 1;
            this.paginationParams.totalCount = this.list ? this.list.length : 0;
            this.paginationParams.totalPage = this.totalPages;
        }, 50);

        if (!this.modal.isShown) { //Check is show modal
            if (this.alwaysShowModal || (this.list && this.list.length === 1)) this.close.emit(this.list[0]);
            else {
                this.cdr.detectChanges();
                this.modal.show();
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.pagedList = this.list ? this.list.slice((((this.paginationParams.pageNum ?? 1) - 1) * (this.paginationParams.pageSize ?? 10)), (this.paginationParams.pageNum ?? 1) * (this.paginationParams.pageSize ?? 10)) : [];
                    setTimeout(() => {
                        this.gridApi.setRowData(this.pagedList);
                        this.gridTableService.selectFirstRow(this.gridApi);
                    }, 300);
                }, 400);
            }
        } else {
            setTimeout(() => {
                this.pagedList = this.list ? this.list.slice((((this.paginationParams.pageNum ?? 1) - 1) * (this.paginationParams.pageSize ?? 10)), (this.paginationParams.pageNum ?? 1) * (this.paginationParams.pageSize ?? 10)) : [];
                this.gridApi?.setRowData(this.pagedList);
                this.gridTableService.selectFirstRow(this.gridApi);
            }, 200);
        }
    }

    async show(val?: any | undefined, list?: any[] | undefined, total?: any | number | null | undefined, filterName?: any | null | undefined) {
        this.filterName = filterName ?? '';
        this.setLoading.emit(true);
        if (!this.isHideSearchField) {
            this.value = val ?? '';
        }
        if (list) {
            this.setLoading.emit(false);
            // Lưu toàn bộ mảng truyền vào
            this.dataStorage = list;
            // Nếu giá trị truyền vào bị null thì sẽ au
            this.list = filterName !== null ? list.filter(e => e[filterName.toString()] ? e[filterName.toString()].toString().includes(val ?? '') : ''.includes(val)) : list;
        }
        if (total) {
            this.paginationParams
                ? ((this.paginationParams.totalCount) = total)
                : (this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 });
        }
        this.paginationParams = { pageNum: 1, pageSize: !this.showPagination ? list?.length : 10, totalCount: 0 };

        if (list) {
            this.setLoading.emit(false);
            // Lưu toàn bộ mảng truyền vào
            this.dataStorage = list;
            // Nếu giá trị truyền vào bị null thì sẽ au
            this.list = filterName !== null ? list.filter(e => e[filterName.toString()] ? e[filterName.toString()].toString().includes(val ?? '') : ''.includes(val)) : list;
        }
        if (total) {
            this.paginationParams
                ? (this.paginationParams.totalCount = total)
                : (this.paginationParams = { pageNum: 1, pageSize: 10, totalCount: 0, totalPage: 0, sorting: '', skipCount: 0 });
        }
        this.paginationParams = { pageNum: 1, pageSize: !this.showPagination ? list?.length : 10, totalCount: 0 };

        this.cdr.detectChanges();
        this.search(val);
    }

    reset() {
        this.list = [];
        this.selectedData = undefined;
        this.paginationParams = { pageNum: 1, pageSize: !this.showPagination ? this.list?.length : 10, totalCount: 0 };;
        // this.paginationParams.totalPage = this.totalPages;
    }

    onCancelBtn() {
        this.filterName = undefined;
        this.modal.hide();
        this.cancel.emit();
    }

    changePaginationParams(paginationParams: PaginationParamsModel) {
        this.paginationParams = paginationParams;
        this.paginationParams.skipCount =
            ((paginationParams.pageNum ?? 1) - 1) * (paginationParams.pageSize ?? 10);
        this.paginationParams.pageSize = paginationParams.pageSize;

        // Nếu truyền list vào, thì sẽ dùng hàm cắt mảng để hiển thị ra những bản ghi trong trang đó
        if (this.dataStorage) {
            this.pagedList = this.list ? this.list.slice(this.paginationParams.skipCount, (this.paginationParams.pageNum ?? 1) * (this.paginationParams.pageSize ?? 10)) : [];
            this.gridApi.setRowData(this.pagedList);
            return;
        }
        this.setLoading.emit(true);
        const api = !this.paginationParams
            ? this?.apiCall(this.value)
            : this?.apiCall(this.value, this.paginationParams);
        api.subscribe((result: any) => {
            this.list = result.items;
            this.paginationParams.totalPage = ceil(
                result.totalCount / (this.paginationParams.pageSize ?? 10)
            );
        }, (err: { error: string; }) => this.notify.error(err.error),
            () => this.setLoading.emit(false)
        );
    }

    // Confirm before close modal
    confirm(params?: any) {
        if (params && params.colDef.editable) {
            return;
        }
        // If save button is hidden, does not allow close modal when double click
        if (this.hideSaveButton) {
            return;
        }
        this.close.emit(params ? params.data : this.selectedData);
        this.filterName = undefined;
        if (this.isClosedWhenChooseData) this.modal.hide();
    }

    onChangeSelection() {
        const selectedData = this.gridApi.getSelectedRows()[0];
        if (selectedData) {
            this.selectedData = selectedData;
        }
    }

    agKeyUp(event: KeyboardEvent) {
        event.stopPropagation();
        event.preventDefault();
        const keyCode = event.key;
        const KEY_ENTER = 'Enter';

        // Press enter to search with modal
        if (keyCode === KEY_ENTER) {
            this.close.emit(this.selectedData);
            this.filterName = undefined;
            if (this.isClosedWhenChooseData) this.modal.hide();
        }
    }

    isDisableSave = false;
    onFilterChanged(params){
        if (this.isShowRowNum){
            let num = 0;
            this.gridTableService.selectFirstRow(this.params?.api);
            if (this.params && this.params.api && this.modal.isShown)
                //this.params.api?.forEachLeafNode(e => { if (e.displayed) num++; });
            this.totalCount = num ;
            if (num == 0 ) this.isDisableSave = true ;
            else this.isDisableSave = false ;
        }


    }
}
