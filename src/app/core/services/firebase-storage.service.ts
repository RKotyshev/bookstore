import { Injectable } from '@angular/core';

import { 
  Observable,
  Subscriber,
  Unsubscribable,
  from,
  of,
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
    if (!inputItem) {
      return of('');
    }
    
    let uploadCompleted = false;

    const subscribeOnUpload = (subscriber: Subscriber<string>): Unsubscribable => {
  
      const storageRef = ref(this._storage, inputItem.name);
      const uploadTask: UploadTask = uploadBytesResumable(storageRef, inputItem.file);

      uploadTask.then(
        () => {
          const inputItemLink: Promise<string> = getDownloadURL(storageRef);

          from(inputItemLink).subscribe((url: string) => {
            subscriber.next(url); 
            uploadCompleted = true;
          });
        },
        () => {          
          subscriber.error();
          uploadCompleted = true;
        },
      );

      const completeTimer = setInterval(() => {
        if (uploadCompleted) {
          subscriber.complete();
          clearInterval(completeTimer);
        }
      }, 300);

      return {
        unsubscribe: (): void => {
          clearInterval(completeTimer);
          subscriber.complete();
        },
      };

    };

    const inputItemLink: Observable<string> = new Observable(subscribeOnUpload);

    return inputItemLink;
  }
}
