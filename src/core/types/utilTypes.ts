/* v8 ignore start */

/**
 * Make all properties in a type required - even deeply nested objects
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Make all properties in a type optional - even deeply nested objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Flatten a type with an object structure into a single level.
 */
export type Flatten<T> = T extends object
  ? {[K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K]}
  : T;

/**
 * Converts a const object into a union of its values.
 */
export type Enumify<T extends object> = T[keyof T];

export type Constructor<T extends object> = new (...args: never[]) => T;
