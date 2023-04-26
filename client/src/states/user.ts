import { BehaviorSubject } from 'rxjs';
import { login as requestLogin, $token, endSession } from '../api/login';
import jwt_decode from 'jwt-decode';
import { z } from 'zod';

const UserSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  sub: z.string(),
  picture: z.string(),
  given_name: z.string(),
});
type UserType = z.infer<typeof UserSchema>;

const decodeUser = (token: string | null): UserType | null => {
  if (!token) return null;
  const decodedToken = jwt_decode(token);
  const result = UserSchema.safeParse(decodedToken);
  if (result.success === false) return null;
  return result.data;
};

export const $user = new BehaviorSubject<UserType | null>(
  decodeUser($token.getValue())
);
$token.subscribe((token) => $user.next(decodeUser(token)));

type Callback = {
  onSuccess: () => any;
  onError: () => any;
};

export const login = async (
  code: string,
  callback: Callback
): Promise<void> => {
  const token = await requestLogin(code);
  const user = decodeUser(token);
  if (!user) return callback.onError();
  $user.next(user);
  callback.onSuccess();
};

export const logout = () => {
  endSession();
  // other sessions to other apis
};
