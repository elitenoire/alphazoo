/* eslint-disable @typescript-eslint/ban-types */
export type Merge<P, T> = Omit<P, keyof T> & T

export type ValueOf<T> = T[keyof T]

// DeepPartial implementation taken from the utility-types NPM package, which is
// Copyright (c) 2016 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
// and used under the terms of the MIT license
export type DeepPartial<T> = T extends Function
  ? T
  : T extends (infer U)[]
  ? _DeepPartialArray<U>
  : T extends object
  ? _DeepPartialObject<T>
  : T | undefined

type _DeepPartialArray<T> = DeepPartial<T>[]
type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }
