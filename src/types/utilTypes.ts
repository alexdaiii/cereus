export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Flatten<T> = T extends object
  ? {[K in keyof T]: T[K] extends object ? Flatten<T[K]> : T[K]}
  : T;

export type Enumify<T extends object> = T[keyof T];

export type Constructor<T extends object> = new (...args: never[]) => T;
