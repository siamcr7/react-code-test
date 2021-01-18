import { API_BASE } from "../constants/api.constants";
import { httpDelete$, httpGet$, httpPost$, httpPut$ } from "./api-base";
import { filter, map, tap } from 'rxjs/operators';
import { Post } from "../interfaces/models/post";
import { User } from "../interfaces/models/user";

export function postPost$(payload: { content: string, userId: number }) {
  return httpPost$<{}, { content: string, userId: number }>(`${API_BASE}/posts`, payload).pipe(
    tap(_ => console.log('posted post!'))
  );
}

export function addFollower$(payload: { followingUserId: number, userId: number }) {
  return httpPost$<{}, { followingUserId: number, userId: number }>(`${API_BASE}/followers`, payload).pipe(
    tap(_ => console.log('added follower'))
  );
}

export function updateProfileVisibility$(payload: { isPrivate: boolean, userId: number }) {
  return httpPut$<{}, { isPrivate: boolean, userId: number }>(`${API_BASE}/users/visibility`, payload).pipe(
    tap(_ => console.log('updated profile visibility'))
  );
}

export function updatePost$(payload: { id: number, content: string }) {
  return httpPut$<{}, { id: number, content: string }>(`${API_BASE}/posts`, payload).pipe(
    tap(_ => console.log('updated profile visibility'))
  );
}

export function getPosts$(userId: number, onlySelf: boolean) {
  return httpGet$<Post[]>(`${API_BASE}/posts/${userId}/${onlySelf}`).pipe(
    tap(_ => console.log('got posts', _.length))
  );
}

export function getUsers$() {
  return httpGet$<User[]>(`${API_BASE}/users`).pipe(
    tap(_ => console.log('got users', _))
  );
}

export function getUserByUserName$(userName: string) {
  return getUsers$().pipe(
    map(users => users.filter(user => user.userName === userName)),
    filter(users => users?.length === 1),
    map(users => {
      return {
        id: users[0].id,
        name: users[0].name,
        userName: users[0].userName,
        isPrivate: users[0].isPrivate
      } as User;
    })
  )
}

// export function getIdByUsername$(userName: string) {
//   return httpGet$<User[]>(`${API_BASE}/users`).pipe(
//     tap(_ => console.log('got users', _.length))
//   );
// }

export function getFollowingUserIdsByUserId$(userId: number) {
  return httpGet$<number[]>(`${API_BASE}/followers/followings/${userId}`).pipe(
    tap(_ => console.log('got following users ids', _.length))
  );
}

export function getFollowerUserIdsByUserId$(userId: number) {
  return httpGet$<number[]>(`${API_BASE}/followers/followers/${userId}`).pipe(
    tap(_ => console.log('got follower users ids', _.length))
  );
}

export function deleteFollower$(userId: number, followingUserId: number) {
  return httpDelete$<number[]>(`${API_BASE}/followers/${userId}/${followingUserId}`).pipe(
    tap(_ => console.log('deleted follower'))
  );
}

export function deletePost$(id: number) {
  return httpDelete$<number[]>(`${API_BASE}/posts/${id}`).pipe(
    tap(_ => console.log('deleted post'))
  );
}