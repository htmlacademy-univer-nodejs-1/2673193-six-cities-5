export const CreateUserValidationMessage = {
  name: {
    required: 'Name is required',
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    required: 'Email is required',
    invalid: 'Email must be a valid email address',
    notUnique: 'A user with this email already exists',
  },
  avatar: {
    invalidFormat: 'Avatar must be valid Url',
  },
  password: {
    required: 'Password is required',
    minLength: 'Minimum password length must be 6',
    maxLength: 'Maximum password length must be 12',
  },
  type: {
    required: 'User type is required',
    invalid: 'Type must be one of: regular, pro',
  }
} as const;
