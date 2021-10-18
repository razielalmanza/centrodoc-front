import jwt_decode from 'jwt-decode';
import { User } from '../types';

export const getUserFromToken = (token: any) => {
  if (!token) return null;
  return jwt_decode<User>(token) as User;
}