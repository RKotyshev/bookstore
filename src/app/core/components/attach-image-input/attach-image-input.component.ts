import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { 
  AbstractControl,
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IImageState } from './attach-image';

@Component({
  selector: 'app-attach-image-input',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatButton,
    MatProgressSpinnerModule,
  ],
  templateUrl: './attach-image-input.component.html',
  styleUrl: './attach-image-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AttachImageInputComponent,
    multi: true,
  }],
})
export class AttachImageInputComponent implements ControlValueAccessor, OnInit {
  @Input() public formControlName!: string;
  @Input() public acceptTypes!: string[];
  public onTouched!: ()=> void;
  public disabled: boolean = false;
  // public imagesPreviewUrls: string[] = [];
  public imagesState: IImageState[] = [];
  // public uploadControl!: FormControl;
  private _inputValue: FileList | null = null;
  private _onChange!: (value: FileList | null)=> void;
  private _control!: AbstractControl | undefined | null;

  constructor(
    @Optional() @Host() @SkipSelf() private _controlContainer: ControlContainer,
  ) {}

  public ngOnInit(): void {
    // this.uploadControl = new FormControl();
    if (this._controlContainer) {
      if (this.formControlName) {
        this._control = this._controlContainer.control?.get(this.formControlName);
      } else {
        console.warn('Missing fomControlName directive');
      } 
    } else {
      console.warn('Can`t find parent FormGroup directive');
    }
  }

  public writeValue(obj: FileList | null): void {
    this._inputValue = obj;
  }

  public registerOnChange(fn: ((value: FileList | null)=> void)): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: ()=> void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public addFiles(files: FileList | null): void {
    console.log(files);
    this._inputValue = files;
    this._onChange(files);
    this._uploadFiles(files);
  }

  private _uploadFiles(files: FileList | null): void {
    // if (files && this._control?.valid) {
    //   this.imagesPreviewUrls = Array.from(files).map((file: File) => {
    //     return URL.createObjectURL(file);
    //   });
    // }

    if (files && this._control?.valid) {
      Array.from(files).forEach((file: File) => {
        const blobLink = URL.createObjectURL(file);
        this.imagesState.push({
          filename: file.name,
          blobLink: blobLink,
          uploadStatus: 'pending',
        });
      });
    }

    // console.log(this.imagesPreviewUrls);
  }
}
