import { ValidationErrors } from '@angular/forms';

import { IItem } from '../interfaces/item';


function getInvalidNamesList(errors: ValidationErrors | null): string[] | null {
  if(!errors) {
    return null;
  }

  const blockedItems = Object.values(errors);
  const blockedNames = blockedItems.reduce(
    (namesArray: string[], currentValidatorItems: IItem[]) => {
      currentValidatorItems.forEach((currentItem: IItem) => {
        namesArray.push(currentItem.name);
      });

      return namesArray;
    }, []);

  return blockedNames;
}

export function filterInvalidItems( inputItems: IItem[] | null, errors: ValidationErrors | null ): 
{ filteredItems: IItem[] | null, errorState: boolean } {
  const items = structuredClone(inputItems);
  let errorState: boolean = false;

  if (!items) {
    return { filteredItems: items, errorState };
  }

  const blockedNames = getInvalidNamesList(errors);

  if (!blockedNames) {
    return { filteredItems: items, errorState };
  }

  errorState = true;

  let filteredItems: IItem[] | null | undefined = items.filter((currentItem: IItem) => {
    return !blockedNames.includes(currentItem.name);
  });

  if (filteredItems === undefined) {
    filteredItems = null;
  }

  return { filteredItems, errorState };
}
