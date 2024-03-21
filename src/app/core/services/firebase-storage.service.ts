import { Injectable } from '@angular/core';

import { 
  Observable,
  Subscriber,
  Unsubscribable,
  from,
} from 'rxjs';

import {
  Storage,
  UploadTask,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';

import { IItem } from '../interfaces/item';


@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {

  constructor(
    private _storage: Storage,
  ) { }

  public uploadItems(inputItems: IItem[]): Observable<IItem[]> {
    const items = structuredClone(inputItems);
    let itemsCount = items.length;

    const subscribeOnUpdates = (subscriber: Subscriber<IItem[]>): Unsubscribable => {

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
  
        if (!item || item.uploadStatus !== 'waiting') {
          itemsCount--;
          continue;
        }
  
        const storageRef = ref(this._storage, item.name);
        const uploadTask: UploadTask = uploadBytesResumable(storageRef, item.file);
        item.uploadStatus = 'pending';
  
        uploadTask.then(
          () => {
            const storageLink: Promise<string> = getDownloadURL(storageRef);
  
            from(storageLink).subscribe((url: string) => {
              const currentItem = items?.find((current: IItem) => {
                return item.name === current.name;
              });
              
              currentItem!.storageLink = url;
              currentItem!.uploadStatus = 'uploaded';

              const copyItems = structuredClone(items);
              itemsCount--;

              console.log(`items from service ${JSON.stringify(copyItems)}`);

              subscriber.next(copyItems); 
            },
            );
          },
          () => {
            const currentItem = items.find((current: IItem) => {
              return item.name === current.name;
            });
    
            currentItem!.storageLink = null;
            currentItem!.uploadStatus = 'canceled';

            const copyItems = structuredClone(items);
            itemsCount--;
            
            subscriber.next(copyItems);
          },
        );

      }

      const completeTimer = setInterval(() => {
        if (itemsCount === 0) {
          subscriber.complete();
          clearInterval(completeTimer);
          console.log('completed');
        }
      }, 700);

      return {
        unsubscribe: (): void => {
          clearInterval(completeTimer);
          subscriber.complete();
        },
      };

    };

    const updatedItems: Observable<IItem[]> = new Observable(subscribeOnUpdates);

    return updatedItems;
  }
}
