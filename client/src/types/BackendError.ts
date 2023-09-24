export type BackendError = {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
    subject?: string[];
    description?: string[];
  };
};
