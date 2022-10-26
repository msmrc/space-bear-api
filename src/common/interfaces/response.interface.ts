/* eslint-disable prettier/prettier */
export enum StatusInterface {
  Success = 200,
  Error = 400,
}

export interface ResponseInterface<T> {
  status: number;
  data: T;
  message: string;
}
