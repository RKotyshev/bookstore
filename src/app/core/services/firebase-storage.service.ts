import { Injectable } from '@angular/core';

import { 
  Observable,
  from,
} from 'rxjs';

import {
  Storage,
  UploadTask,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { IInputItem } from '../components/input-file/interfaces/input-item';


@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {

  constructor(
    private _storage: Storage,
  ) { }

  public deleteItem(item: IInputItem): Observable<void> {
    const storageRef = ref(this._storage, item.name);

    return from(deleteObject(storageRef));
  }

  public uploadItems(inputItem: IInputItem | null): Observable<string> {
    const storageRef = ref(this._storage, inputItem?.name);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, inputItem!.file);

    return from(uploadTask.then(
      () => {
        return getDownloadURL(storageRef);
      },
    )) as Observable<string>;
  }
}
