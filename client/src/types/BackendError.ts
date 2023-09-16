export type BackendError = {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
  };
};
