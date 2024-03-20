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
  // public imagesPreviewUrls: string[] = [];
  public imagesState: IItem[] = [];
  public displayPreview: boolean = false;
  // public uploadControl!: FormControl;
  // private _inputValue: FileList | null = null;
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
    // console.log(files);
    const items = this._transformFiles(files);
    
    if (!items) {
      return;
    }

    const concatedItems = this.inputValue ? 
      [...this.inputValue, ...items] : 
      items;
    this.inputValue = concatedItems;
    console.log(this.inputValue);
    console.log(concatedItems);
    this._onChange(concatedItems);
    this._uploadItems(concatedItems);
  }

  public onInfo(): void {
    console.log(this.imagesState);
  }

  private _uploadItems(items: IItem[] | null): void {
    // if (files && this._control?.valid) {
    //   this.imagesPreviewUrls = Array.from(files).map((file: File) => {
    //     return URL.createObjectURL(file);
    //   });
    // }

    if (items?.length && this._control?.valid) {

      // Array.from(files).forEach((file: File) => {
      //   const blobLink = URL.createObjectURL(file);
      //   // const storageRef = ref(this.storage, file.name);
      //   // uploadBytesResumable(storageRef, file);
      //   // const storageLink: Observable<string> = from(getDownloadURL(storageRef));
        
      //   this.imagesState.push({
      //     file: file,
      //     filename: file.name,
      //     size: file.size,
      //     type: file.type,
      //     blobLink: blobLink,
      //     uploadStatus: 'pending',
      //   });


      // });

      this.displayPreview = true;
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item) {
          const storageRef = ref(this.storage, item.name);
          const uploadTask: UploadTask = uploadBytesResumable(storageRef, item.file);

          uploadTask.then(() => {
            const storageLink: Promise<string> = getDownloadURL(storageRef);

            from(storageLink).subscribe((url: string) => {
              const currentItem = this.inputValue?.find((current: IItem) => {
                return item.name === current.name;
              });
              
              currentItem!.storageLink = url;
              currentItem!.uploadStatus = 'uploaded';
            });
          }, () => {
            const currentItem = this.inputValue?.find((current: IItem) => {
              return item.name === current.name;
            });

            currentItem!.storageLink = null;
            currentItem!.uploadStatus = 'canceled';
          });
          
          // from(storageLink).subscribe({
          //   next: (url: string) => {
          //     const currentState = this.imagesState.find((state: IItem) => {
          //       return file.name === state.filename;
          //     });
  
          //     currentState!.storageLink = url;
          //     currentState!.uploadStatus = 'uploaded';
          //   },
          //   error: () => {
          //     const currentState = this.imagesState.find((state: IItem) => {
          //       return file.name === state.filename;
          //     });
  
          //     currentState!.storageLink = null;
          //     currentState!.uploadStatus = 'canceled';
          //   },
          // });
        }


      }
      
    }

    // console.log(this.imagesPreviewUrls);
  }

  private _transformFiles(files: FileList | null): IItem[] | null {
    if (!files) {
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
        uploadStatus: 'pending',
      };
    });
  }

}
