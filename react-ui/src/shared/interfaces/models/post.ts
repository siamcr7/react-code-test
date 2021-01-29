export interface Post {
  id: number;
  userId: number;
  content: string;
  createdTimeStamp: string | null;
  isEditingState?: boolean;
}
