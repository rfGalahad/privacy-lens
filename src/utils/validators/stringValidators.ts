import type { ValidationRule } from "@/hooks/useForm";

/**
 * Fails if the string length is below the minimum.
 */
export const minLength =
  (min: number, message?: string): ValidationRule<string> =>
  (value: string) =>
    value.length < min
      ? message ?? `Must be at least ${min} characters`
      : undefined;

/**
 * Fails if the string length exceeds the maximum.
 */
export const maxLength =
  (max: number, message?: string): ValidationRule<string> =>
  (value: string) =>
    value.length > max
      ? message ?? `Must be no more than ${max} characters`
      : undefined;

/**
 * Fails if the string length is not within [min, max] (inclusive).
 */
export const lengthBetween =
  (min: number, max: number, message?: string): ValidationRule<string> =>
  (value: string) =>
    value.length < min || value.length > max
      ? message ?? `Must be between ${min} and ${max} characters`
      : undefined;

/**
 * Fails if the string is not a valid email address.
 */
export const email =
  (message = "Enter a valid email address"): ValidationRule<string> =>
  (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : message;

/**
 * Fails if the string is not a valid URL (http or https).
 */
export const url =
  (message = "Enter a valid URL"): ValidationRule<string> =>
  (value: string) => {
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:"
        ? undefined
        : message;
    } catch {
      return message;
    }
  };

/**
 * Fails if the string does not match the given regular expression.
 */
export const pattern =
  (regex: RegExp, message: string): ValidationRule<string> =>
  (value: string) =>
    regex.test(value) ? undefined : message;

/**
 * Fails if the string contains any whitespace characters.
 */
export const noWhitespace =
  (message = "Must not contain spaces"): ValidationRule<string> =>
  (value: string) =>
    /\s/.test(value) ? message : undefined;

/**
 * Fails if the string contains non-alphabetic characters (a–z, A–Z).
 */
export const alpha =
  (message = "Must contain letters only"): ValidationRule<string> =>
  (value: string) =>
    /^[a-zA-Z]+$/.test(value) ? undefined : message;

/**
 * Fails if the string contains characters outside a–z, A–Z, and 0–9.
 */
export const alphanumeric =
  (message = "Must contain letters and numbers only"): ValidationRule<string> =>
  (value: string) =>
    /^[a-zA-Z0-9]+$/.test(value) ? undefined : message;

/**
 * Fails if the string (trimmed) matches any of the provided reserved words.
 *
 * @example
 * notReserved(["admin", "root"], "This username is reserved")
 */
export const notReserved =
  (reserved: string[], message = "This value is reserved"): ValidationRule<string> =>
  (value: string) =>
    reserved.map((r) => r.toLowerCase()).includes(value.trim().toLowerCase())
      ? message
      : undefined;