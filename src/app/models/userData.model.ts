export enum UserRole {
  admin = 'admin',
  supervisor = 'supervisor',
  bachelor = 'bachelor',
}

export type UserData = {
  user_id: string;
  login: string;
  role: UserRole;
  diploma_cycle_id: string;
};
