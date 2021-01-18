export interface User {
  id: number;
  name: string;
  userName: string;
  isPrivate: 1 | 0;
  isFollowing?: boolean;
}
