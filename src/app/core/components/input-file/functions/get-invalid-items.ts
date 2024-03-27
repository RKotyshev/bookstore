import { ValidationErrors } from '@angular/forms';

import { IInputFileItem } from '../interfaces/input-file-item';


export function getInvalidItems(errors: ValidationErrors | null): IInputFileItem[] | null {
  if(!errors) {
    return null;
  }

  const invalidItemsArrays = Object.values(errors);
  const uniqueInvalidItems = invalidItemsArrays.reduce(
    (itemsSet: Set<IInputFileItem>, currentValidatorItems: IInputFileItem[]) => {
      currentValidatorItems.forEach((currentItem: IInputFileItem) => {
        itemsSet.add(currentItem);
      });

      return itemsSet;
    }, new Set());

  return Array.from(uniqueInvalidItems.values());
}
