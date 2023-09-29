export type BackendError = {
  message: string;
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
    code?: string[];
    credits?: string[];
    years?: string[];
    size?: string[];
    subject?: string[];
    description?: string[];
    group?: string[];
    role?: string[];
    user?: string[];
  };
};
