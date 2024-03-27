import { ValidationErrors } from '@angular/forms';

import { IInputItem } from '../interfaces/input-item';


export function getInvalidItems(errors: ValidationErrors | null): IInputItem[] | null {
  if(!errors) {
    return null;
  }

  const invalidItemsArrays = Object.values(errors);
  const uniqueInvalidItems = invalidItemsArrays.reduce(
    (itemsSet: Set<IInputItem>, currentValidatorItems: IInputItem[]) => {
      currentValidatorItems.forEach((currentItem: IInputItem) => {
        itemsSet.add(currentItem);
      });

      return itemsSet;
    }, new Set());

  return Array.from(uniqueInvalidItems.values());
}
