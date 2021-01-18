import React from "react";
import { useEffect, useState } from "react";
import { map, mergeMap } from "rxjs/operators";
import { addFollower$, deleteFollower$, getFollowingUserIdsByUserId$, getUsers$ } from "../shared/api-services/api-services";
import { User } from "../shared/interfaces/models/user";

export function Users(props: { id: number | null }) {

  const [users, setUsers] = useState([] as User[]);

  const fetchData$ = () => {
    return getUsers$().pipe(
      mergeMap(users => {
        return getFollowingUserIdsByUserId$(props.id as number).pipe(
          map(followingUserIds => {
            const followingUsersMapped = new Map<number, boolean>([
              ...followingUserIds.map(userId => [userId, true] as [number, boolean])
            ]);

            return users.map(user => {
              return {
                id: user.id,
                name: user.name,
                userName: user.userName,
                isFollowing: followingUsersMapped.has(user.id),
                isPrivate: user.isPrivate
              } as User;
            });
          })
        )
      })
    );
  }

  useEffect(() => {
    fetchData$().subscribe(users => setUsers(users));
  }, []);

  const changeStatus = (doFollow: boolean, userId: number) => {
    if (doFollow === true) {
      // follow
      addFollower$({ followingUserId: userId, userId: props.id as number }).pipe(
        mergeMap(_ => fetchData$())
      ).subscribe(users => setUsers(users));
    } else {
      // unfollow
      deleteFollower$(props.id as number, userId).pipe(
        mergeMap(_ => fetchData$())
      ).subscribe(users => setUsers(users));
    }
  };

  return (
    <React.Fragment>
      <h1>Follow/Unfollow</h1>
      {
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>User Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {
              users.filter(user => user.id !== props.id).map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.userName}</td>
                    <td>
                      {
                        user.isFollowing === true
                        ? <button onClick={() => changeStatus(false, user.id)}>Unfollow</button>
                        : <button onClick={() => changeStatus(true, user.id)}>Follow</button>
                      }
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      }
    </React.Fragment>
  )
}