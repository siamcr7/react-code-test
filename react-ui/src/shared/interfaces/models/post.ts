export interface Post {
  id: number;
  userId: number;
  content: string;
  isEditingState?: boolean;
}
