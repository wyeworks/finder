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
    meeting_link?: string[];
    start_time?: string[];
    end_time?: string[];
    group_id?: string[];
    current_password?: string[];
  };
};
