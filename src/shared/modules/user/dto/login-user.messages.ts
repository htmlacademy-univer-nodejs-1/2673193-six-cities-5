export const LoginUserValidationMessage = {
  email: {
    required: 'Email is required',
    invalidFormat: 'Email must be a valid email address',
  },
  password: {
    required: 'Password is required',
    invalidFormat: 'Password must be a string',
  }
} as const;
