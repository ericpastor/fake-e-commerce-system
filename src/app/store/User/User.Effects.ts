import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import {
  loadUserById,
  loadUserByIdFail,
  loadUserByIdSuccess,
  loadUsers,
  loadUsersFail,
  loadUsersSuccess,
} from './User.Actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class UserEffects {
  private actions = inject(Actions);
  private service = inject(UsersService);

  loadUsers = createEffect(() =>
    this.actions.pipe(
      ofType(loadUsers),
      exhaustMap((action) =>
        this.service.getAllUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) =>
            of(loadUsersFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
  loadUserById = createEffect(() =>
    this.actions.pipe(
      ofType(loadUserById),
      exhaustMap((action) =>
        this.service.getUserById(action.id).pipe(
          map((user) => loadUserByIdSuccess({ user })),
          catchError((error) =>
            of(loadUserByIdFail({ errorMessage: error.message }))
          )
        )
      )
    )
  );
}
