export interface User {
  id: string;
  email: string;
  email_verified?: boolean;
  roles?: string[];
}
