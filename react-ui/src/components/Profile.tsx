import React from "react";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { forkJoin, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { deletePost$, getFollowerUserIdsByUserId$, getFollowingUserIdsByUserId$, getPosts$, getUserByUserName$, updatePost$ } from "../shared/api-services/api-services";
import { Post } from "../shared/interfaces/models/post";
import { PostList } from "./PostsList";

export function Profile(props: {
  id: number | null, 
  isPrivate: boolean | null,
  toggle: (isPrivate: boolean) => void
}) {

  const { username } = useParams() as any;

  const [posts, setPosts] = useState([] as Post[]);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (props.id !== null) {
      // logged in
      getPosts$(props.id as number, true).subscribe(res => {
        setPosts(res);
      });

      getFollowerUserIdsByUserId$(props.id as number).subscribe((res) => setFollowersCount(res.length));
      getFollowingUserIdsByUserId$(props.id as number).subscribe((res) => setFollowingCount(res.length));
    } else {
      // not logged in
      getUserByUserName$(username).pipe(
        mergeMap(user => {
          // reset state
          if (user.isPrivate === 1) {
            return of([[], [], []]);
          }
          const userId = user.id;
          const apiCalls$ = forkJoin([
            getPosts$(userId, true),
            getFollowerUserIdsByUserId$(userId),
            getFollowingUserIdsByUserId$(userId),
          ]);

          return apiCalls$;
        })
      ).subscribe(res => {
        setPosts(res[0]);
        setFollowersCount(res[1].length);
        setFollowingCount(res[2].length);
      });
    }

  }, [props.id, username]);

  return (
    <React.Fragment>
      {
        props.id !== null
          ? <h3>
            Profile Visibility:
            { 
              props.isPrivate === true
                ? <React.Fragment><span>Private</span> <button onClick={() => props.toggle(false)}>Toggle</button></React.Fragment>
                : <React.Fragment><span>Public</span> <button onClick={() => props.toggle(true)}>Toggle</button></React.Fragment>
            }
          </h3>
          : ''
      }

      <h1>Followers: {followersCount}</h1>
      <h1>Followings: {followingCount}</h1>
      <h1>User Tweets</h1>
      <PostList
        posts={posts}
        canEdit={true}
        deletePost={(postId) => {
          deletePost$(postId).pipe(
            mergeMap(_ => getPosts$(props.id as number, true))
          ).subscribe(res => {
            setPosts(res);
          });
        }}
        saveEditPost={(postId: number, content: string) => {
          updatePost$({ id: postId, content }).pipe(
            mergeMap(_ => getPosts$(props.id as number, true))
          ).subscribe(res => {
            setPosts(res);
          });
        }}></PostList>
    </React.Fragment>
  )
}