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

import { IInputFileItem } from './interfaces/input-file-item';
import { transformFiles } from './functions/transform-files';
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
  @Input() 
  public formControlName!: string;

  @Input() 
  public acceptTypes!: string[];

  @Output() 
  public delete: EventEmitter<IInputFileItem> = new EventEmitter();

  public inputValue: IInputFileItem[] | null = null;
  public disabled: boolean = false;
  public existedFiles: File[] = [];
  public uploadControl!: FormControl<FileList | null>;
  public onTouched!: ()=> void;
  private _onChange!: (value: IInputFileItem[] | null)=> void;

  constructor() {}

  public ngOnInit(): void {
    this.uploadControl = new FormControl<FileList | null>(null);
  }

  public writeValue(obj: IInputFileItem[] | null): void {
    this.inputValue = obj;
  }

  public registerOnChange(fn: ((value: IInputFileItem[] | null)=> void)): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: ()=> void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public addFiles(files: FileList | null): void {
    if (!files) {
      return;
    }

    this.existedFiles = [];

    const existedNames = this.inputValue?.map((item: IInputFileItem) => {
      return item.name;
    }) ?? [];

    this.existedFiles = Array.from(files).filter((file: File) => {
      return existedNames.includes(file.name);
    });

    const newFiles = Array.from(files).filter((file: File) => {
      return !existedNames.includes(file.name);
    });

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
    
    const updatedInputItems = this.inputValue ? 
      [...this.inputValue, ...transformedFiles] : 
      transformedFiles;

    console.log(updatedInputItems);
    this.inputValue = updatedInputItems;
    this._onChange(updatedInputItems);
  }

  public onDelete(deleteItem: IInputFileItem): void {
    const updatedInputItems = this.inputValue?.filter((current: IInputFileItem) => {
      return deleteItem.name !== current.name;
    });

    this.inputValue = updatedInputItems ?? null;
    this._onChange(updatedInputItems ?? null);
  }
}
