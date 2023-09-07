import { AxiosError } from 'axios';

export class ClientResponseError extends Error {
  url: string = '';
  status?: number = 0;
  response: { [key: string]: any } = {};
}

export function createError(e: AxiosError<any, any>): ClientResponseError {
  return {
    url: e.request.url,
    status: e.response?.status,
    response: e.response?.data,
    name: 'ClientResponseError',
    message: 'Something went wrong while processing your request.',
  };
}
