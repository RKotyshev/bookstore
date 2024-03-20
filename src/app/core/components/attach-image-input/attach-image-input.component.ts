import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-attach-image-input',
  standalone: true,
  imports: [
    MatButton,
  ],
  templateUrl: './attach-image-input.component.html',
  styleUrl: './attach-image-input.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: AttachImageInputComponent,
    multi: true,
  }],
})
export class AttachImageInputComponent implements ControlValueAccessor {
  @Input() public acceptTypes!: string[];
  public onTouched!: ()=> void;
  public disabled: boolean = false;
  private _inputValue: FileList | null = null;
  private _onChange!: (value: FileList | null)=> void;

  constructor() {}

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

  public onImage(files: FileList | null): void {
    console.log(files);
    this._inputValue = files;
    this._onChange(files);
  }
}
