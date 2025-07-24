export const emailValidation = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email format',
  },
};

export const signinPasswordValidation = {
  required: 'Password is required',
};

export const signupPasswordValidation = {
  required: 'Password is required',
  minLength: {
    value: 8,
    message: 'Password must be at least 8 characters',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
    message: 'Password must contain at least one letter, number, and special character',
  },
};

export const nameValidation = {
  required: 'Name is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters',
  },
};