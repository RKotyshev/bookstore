import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { 
  ControlValueAccessor,
  ReactiveFormsModule,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { IItem } from '../../interfaces/item';
import { transformNewFiles } from '../../functions/file-transform';
import { SliceSentencePipe } from '../../pipes/slice-sentence.pipe';

@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatButton,
    MatProgressSpinnerModule,
    SliceSentencePipe,
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
  public inputValue: IItem[] | null = null;
  public uploadControl!: FormControl<FileList | null>;
  private _onChange!: (value: IItem[] | null)=> void;

  constructor() {}

  public ngOnInit(): void {
    this.uploadControl = new FormControl<FileList | null>(null);
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
    const items = transformNewFiles(files, existNames);
    this.uploadControl.setValue(null);

    if (!items) {
      return;
    }
    
    const combinedItems = this.inputValue ? 
      [...structuredClone(this.inputValue), ...items] : 
      items;

    this._onChange(combinedItems);

    console.log(this.inputValue);
    console.log(combinedItems);
  }

  public onDelete(item: IItem): void {
    item.uploadStatus = 'waiting';
    this.delete.emit(item);
  }
}
