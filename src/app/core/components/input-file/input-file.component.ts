import {
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  SkipSelf,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { 
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  ReactiveFormsModule,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IItem } from '../../interfaces/item';
import { transformFiles } from '../../functions/file-transform';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatButton,
    MatProgressSpinnerModule,
  ],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputFileComponent,
    multi: true,
  }],
})
export class InputFileComponent implements ControlValueAccessor, OnInit {
  @Input() public formControlName!: string;
  @Input() public acceptTypes!: string[];
  @Output() public delete: EventEmitter<IItem> = new EventEmitter();
  public onTouched!: ()=> void;
  public disabled: boolean = false;
  public _inputValue: IItem[] | null = null;
  public uploadControl!: FormControl<FileList | null>;
  public outerControl!: AbstractControl | undefined | null;
  private _onChange!: (value: IItem[] | null)=> void;

  constructor(
    @Optional() @Host() @SkipSelf() private _controlContainer: ControlContainer,
  ) {}

  public set inputValue(value: IItem[] | null) {
    if (value === null) {
      this._inputValue = value;

      return;
    }

    const blockedItems = this.outerControl?.getError('maxFileSize');
    console.log('Blocked items:');
    console.log(blockedItems);

    if (!blockedItems) {
      this._inputValue = value;

      return;
    }

    const blockedNames = blockedItems.map((currentItem: IItem) => {
      return currentItem.name;
    });

    const copyValue = structuredClone(value);
    let updatedItems: IItem[] | null | undefined = copyValue?.filter((currentItem: IItem) => {
      return !blockedNames.includes(currentItem.name);
    });

    if (!updatedItems) {
      updatedItems = null;
    }

    this._inputValue = updatedItems;
    this._onChange(updatedItems);
  }

  public get inputValue(): IItem[] | null {
    return this._inputValue;
  }

  public ngOnInit(): void {
    this.uploadControl = new FormControl<FileList | null>(null);

    if (this._controlContainer) {
      if (this.formControlName) {
        this.outerControl = this._controlContainer.control?.get(this.formControlName);
      } else {
        console.warn('Missing fomControlName directive');
      } 
    } else {
      console.warn('Can`t find parent FormGroup directive');
    }
  }

  public writeValue(obj: IItem[] | null): void {
    this.inputValue = obj;
  }

  public registerOnChange(fn: ((value: IItem[] | null)=> void)): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: ()=> void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public addFiles(files: FileList | null): void {
    console.log('test');
    if (!files) {
      return;
    }

    const existNames = this.inputValue?.map((item: IItem) => {
      return item.name;
    });
    const items = transformFiles(files, existNames);

    if (!items) {
      return;
    }
    
    // console.log('test');

    const combinedItems = this.inputValue ? 
      [...structuredClone(this.inputValue), ...items] : 
      items;

    this._onChange(combinedItems);
    this.inputValue = combinedItems;
    this.uploadControl.setValue(null);

    console.log(this.inputValue);
    console.log(combinedItems);
  }

  public onDelete(item: IItem): void {
    item.uploadStatus = 'waiting';
    this.delete.emit(item);
  }

  // public checkDisplay(item: IItem): boolean {
  //   const blockedItems = this.outerControl?.getError('maxFileSize');
    
  //   if (!blockedItems) {
  //     return true;
  //   }

  //   const invalidItem = blockedItems.find((currentItem: IItem) => {
  //     return currentItem.name === item.name;
  //   });
    
  //   if (!invalidItem) {
  //     return true;
  //   }
    
  //   let updatedItems: IItem[] | null | undefined = this.inputValue?.filter((currentItem: IItem) => {
  //     return currentItem.name !== invalidItem.name;
  //   });

  //   if (!updatedItems) {
  //     updatedItems = null;
  //   }

  //   this.inputValue = updatedItems;
  //   this._onChange(updatedItems);

  //   // const blockedItemsNames = blockedItems.map((currentItem: IItem) => {
  //   //   return currentItem.name;
  //   // });

  //   // return !blockedItemsNames.includes(item.name);

  //   return !invalidItem;
  // }

  public onConsole(): void {
    console.log(this.outerControl?.getError('maxFileSize'));
  }

}
