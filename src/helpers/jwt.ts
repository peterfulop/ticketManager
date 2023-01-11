import JWT from 'jsonwebtoken';
import { config } from '../config/config';

export const JWTSign = (input: {
  userId: string;
  email: string;
  expiresIn: string;
}) => {
  const { userId, email, expiresIn } = input;
  return JWT.sign(
    { userId: userId, email: email },
    config.cookie.sessiontokenKey,
    {
      expiresIn,
    }
  );
};

export const JWTVerify = (token: string) => {
  try {
    return JWT.verify(token, config.cookie.sessiontokenKey) as {
      userId: string;
    };
  } catch (error) {
    return null;
  }
};
