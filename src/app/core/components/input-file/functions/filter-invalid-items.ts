import { ValidationErrors } from '@angular/forms';

import { IInputFileItem } from '../interfaces/input-file-item';


export function getInvalidNamesList(errors: ValidationErrors | null): string[] | null {
  if(!errors) {
    return null;
  }

  const blockedItems = Object.values(errors);
  const blockedNames = blockedItems.reduce(
    (namesArray: string[], currentValidatorItems: IInputFileItem[]) => {
      currentValidatorItems.forEach((currentItem: IInputFileItem) => {
        namesArray.push(currentItem.name);
      });

      return namesArray;
    }, []);

  return blockedNames;
}
