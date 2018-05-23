import { User } from './auth/user.model';

export const mockUser: User = {
  uid: 'uid',
  name: 'Name',
  email: 'email@test.com',
  photoURL: 'non-default',
  town: 'Honolulu',
  fastBuy: true,
  ignored: [],
  bargains: []
};
