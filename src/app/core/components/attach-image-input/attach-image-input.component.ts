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
import { IItem } from './attach-image';
import { Storage, UploadTask, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';

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
  @Input() public storage!: Storage;
  public onTouched!: ()=> void;
  public disabled: boolean = false;
  public displayPreview: boolean = false;
  // public uploadControl!: FormControl;
  public inputValue: IItem[] | null = null;
  private _onChange!: (value: IItem[] | null)=> void;
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
    const items = this._transformFiles(files);
    
    if (!items) {
      return;
    }

    const concatedItems = this.inputValue ? 
      [...structuredClone(this.inputValue), ...items] : 
      items;
    this.inputValue = concatedItems; // value
    console.log(this.inputValue);
    console.log(concatedItems);
    this._onChange(concatedItems);  // Control
    this._uploadItems(concatedItems); // to firebase handle
  }

  private _uploadItems(inputItems: IItem[] | null): void {
    const items = structuredClone(inputItems);

    if (!items?.length || this._control?.invalid) {
      return;
    }

    this.displayPreview = true;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!item || item.uploadStatus !== 'waiting') {
        continue;
      }
      console.log(`will upload ${item.name}`);

      const storageRef = ref(this.storage, item.name);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, item.file);
      item.uploadStatus = 'pending';

      uploadTask.then(() => {
        const storageLink: Promise<string> = getDownloadURL(storageRef);

        from(storageLink).subscribe((url: string) => {
          const currentItem = items?.find((current: IItem) => {
            return item.name === current.name;
          });
          
          currentItem!.storageLink = url;
          currentItem!.uploadStatus = 'uploaded';

          const updatedItems = structuredClone(items);
          this.inputValue = updatedItems;
          this._onChange(updatedItems);
        });
      }, () => {
        const currentItem = items.find((current: IItem) => {
          return item.name === current.name;
        });

        currentItem!.storageLink = null;
        currentItem!.uploadStatus = 'canceled';

        const updatedItems = structuredClone(items);
        this.inputValue = updatedItems;
        this._onChange(updatedItems);
      });
      
    }
  }

  private _transformFiles(files: FileList | null): IItem[] | null {
    if (!files) {
      return null;
    }

    const existNames = this.inputValue?.map((item: IItem) => {
      return item.name;
    });
    const newFiles = Array.from(files).filter((file: File) => {
      return !existNames?.includes(file.name);
    });

    if (!newFiles.length) {
      return null;
    }

    return Array.from(files).map((file: File) => {
      const blobLink = URL.createObjectURL(file);

      return {
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        blobLink: blobLink,
        storageLink: null,
        uploadStatus: 'waiting',
      };
    });
  }

}
