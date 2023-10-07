export type Member = {
  id?: any; // put string o number here
  bio?: string;
  name: string;
  email: string;
  role: 'Miembro' | 'Administrador';
};
