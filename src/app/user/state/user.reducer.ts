import { createReducer, on } from '@ngrx/store';
import { UserPageActions } from './actions';

import { User } from '../user';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserPageActions.maskUserName, (state) => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
