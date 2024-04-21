import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivateFn } from '@angular/router';

import { of } from 'rxjs';

import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';


export interface ICanComponentDeactivate {
  canDeactivate: ()=> boolean,
}

export const canDeactivateGuard: CanDeactivateFn<ICanComponentDeactivate> = (
  component: ICanComponentDeactivate,
) => {
  if (component.canDeactivate()) {
    return of(true);
  }

  const dialogService = inject(MatDialog);
  const dialogRef = dialogService.open(ConfirmDialogComponent, {
    minHeight: 200,
  });

  return dialogRef.afterClosed();
};
