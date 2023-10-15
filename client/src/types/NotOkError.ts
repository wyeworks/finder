import { BackendError } from '@/types/BackendError';

export class NotOkError extends Error {
  readonly backendError: BackendError;
  readonly status: number;

  constructor(backendError: BackendError, status: number) {
    super(backendError.message);
    this.backendError = backendError;
    this.status = status;
  }
}
