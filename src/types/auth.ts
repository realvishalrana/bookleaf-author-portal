export interface StoredUser {
  id: string;
  email: string;
  role: string;
  authorId: string | null;
  name: string | null;
}

export interface LoginResponse {
  accessToken: string;
  user: StoredUser;
}
