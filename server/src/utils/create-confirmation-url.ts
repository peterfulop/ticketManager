import { config } from '../config/config';
import { JWTSign } from '../helpers/jwt';

export const createConfirmationUrl = (
  userId: string,
  email: string
): string => {
  const confirmationToken = JWTSign({
    userId,
    email,
    expiresIn: config.cookie.confirmationExp,
  });

  return `http://localhost:${config.application.port}/user/confirm/${confirmationToken}`;
};
