export enum EServerSideError {
  MISSING_TITLE_AND_CONTENT = 'MISSING_TITLE_AND_CONTENT',
  MISSING_SIGNUP_DATA = 'MISSING_SIGNUP_DATA',
  ONE_FIELD_TO_UPDATE = 'ONE_FIELD_TO_UPDATE',
  MISSING_RECORD = 'MISSING_RECORD',
  SERVER_ERROR = 'SERVER_ERROR',
  SHORT_PASSWORD = 'SHORT_PASSWORD',
  PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',
  MISSING_INPUTS = 'MISSING_INPUTS',
  INVALID_EMAIL_ADDRESS = 'INVALID_EMAIL_ADDRESS',
  EMAIL_ADDRESS_ALREADY_IN_USE = 'EMAIL_ADDRESS_ALREADY_IN_USE',
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  USER_UNAUTHORIZED = 'USER_UNAUTHORIZED',
  UNCONFIRMED_USER = 'UNCONFIRMED_USER',
  ALREADY_CONFIRMED_USER = 'ALREADY_CONFIRMED_USER',
  MISSING_FIELDS = 'MISSING_FIELDS',
  UNIQUE_CONSTRAINT_FAIL = 'UNIQUE_CONSTRAINT_FAIL',
}
