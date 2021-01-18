import React, { useEffect, useState } from "react";
import { getPosts$, postPost$ } from "../shared/api-services/api-services";
import { Post } from "../shared/interfaces/models/post";
import { PostList } from "./PostsList";

export function Homepage(props: {id: number | null}) {
  const inpRef: React.RefObject<HTMLTextAreaElement> = React.createRef<HTMLTextAreaElement>();

  const doPost = (content: string) => {
    if (content === null || content.trim().length === 0 || content.length > 120) {
      alert('Tweet len min: 0, max: 120');
      return;
    }
    postPost$({ content, userId: props.id as number}).subscribe();
  };

  const [posts, setPosts] = useState([] as Post[]);

  useEffect(() => {
    getPosts$(props.id as number, false).subscribe(res => {
      setPosts(res);
    });

  }, []);

  return (
    <React.Fragment>
      <h1>This is homepage {props.id}</h1>
      <textarea ref={inpRef}></textarea>
      <div>
        <button onClick={() => doPost(inpRef.current?.value as string)}>Post</button>
      </div>

      <h2>Following Users Posts</h2>
      <PostList posts={posts}></PostList>

    </React.Fragment>
  );
}