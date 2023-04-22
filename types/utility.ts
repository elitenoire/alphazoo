export type Merge<P, T> = Omit<P, keyof T> & T

export type ValueOf<T> = T[keyof T]
