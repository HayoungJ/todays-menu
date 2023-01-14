import { AuthError, User } from 'firebase/auth';

export namespace FirebaseAuthType {
  type error = AuthError;
  type user = User;
}
