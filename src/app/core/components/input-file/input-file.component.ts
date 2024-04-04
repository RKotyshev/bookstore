import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { 
  ControlValueAccessor,
  ReactiveFormsModule,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatButton } from '@angular/material/button';

import { IInputItem } from './interfaces/input-item';
import { transformFiles } from './functions/transform-files';
import { SliceSentencePipe } from '../../pipes/slice-sentence.pipe';
import { filterByHash, getHash } from './functions/filter-by-hash';


@Component({
  selector: 'app-input-file',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    MatButton,
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
  @Input() 
  public formControlName!: string;

  @Input() 
  public acceptTypes!: string[];

  public inputValue: IInputItem[] | null = null;
  public disabled: boolean = false;
  public existedFiles: File[] = [];
  public uploadControl!: FormControl<FileList | null>;
  private _onTouched!: ()=> void;
  private _onChange!: (value: IInputItem[] | null)=> void;

  constructor() {}

  public ngOnInit(): void {
    this.uploadControl = new FormControl<FileList | null>(null);
  }

  public writeValue(obj: IInputItem[] | null): void {
    this.inputValue = obj;
  }

  public registerOnChange(fn: ((value: IInputItem[] | null)=> void)): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: ()=> void): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public addFiles(files: FileList | null): void {
    this._onTouched();

    if (!files) {
      return;
    }

    this.existedFiles = [];

    const existedHashes = this.inputValue?.map((item: IInputItem) => {
      return getHash(item);
    }) ?? [];

    const filesArray = Array.from(files);

    this.existedFiles = filterByHash(filesArray, existedHashes, 'pick');

    const newFiles = filterByHash(filesArray, existedHashes, 'omit');

    if (!newFiles.length) {
      return;
    }

    const transformedFiles = transformFiles(newFiles, {
      acceptTypes:  ['image/jpeg', 'image/png'],
      maxSize: {
        size: 4,
        unit: 'MB',
      },
    });

    this.uploadControl.setValue(null);

    const updatedInputItems = [...this.inputValue ?? [], ...transformedFiles];

    this.inputValue = updatedInputItems;
    this._onChange(updatedInputItems);
  }

  public onDelete(deleteItem: IInputItem): void {
    const updatedInputItems = this.inputValue?.filter((current: IInputItem) => {
      return deleteItem.name !== current.name;
    });

    this.inputValue = updatedInputItems ?? null;
    this._onChange(updatedInputItems ?? null);
  }
}
