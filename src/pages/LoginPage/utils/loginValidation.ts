export interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_MAX   = 254;
const PASSWORD_MAX = 128;
const PASSWORD_MIN = 8;
const EMAIL_REGEX  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return "Email is required.";
  if (value.length > EMAIL_MAX) return `Email must be ${EMAIL_MAX} characters or fewer.`;
  if (!EMAIL_REGEX.test(value)) return "Enter a valid email address.";
}

export function validatePassword(value: string): string | undefined {
  if (!value) return "Password is required.";
  if (value.length < PASSWORD_MIN) return `Password must be at least ${PASSWORD_MIN} characters.`;
  if (value.length > PASSWORD_MAX) return `Password must be ${PASSWORD_MAX} characters or fewer.`;
}

export function validate(email: string, password: string): FormErrors {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
}