import React, { useEffect, useState } from "react"
import { Post } from "../shared/interfaces/models/post"

export function PostList(props: { 
  posts: Post[], 
  canEdit?: boolean, 
  deletePost: (postId: number) => void,
  saveEditPost: (postId: number, content: string) => void}) {

  const [posts, setPosts] = useState([] as Post[]);
  const [currentEdit, setCurrentEdit] = useState('');

  const editPost = (postId: number) => {
    setPosts([...props.posts.map(post => {
      if (post.id === postId) {
        setCurrentEdit(post.content);
        return {
          content: post.content,
          id: post.id,
          userId: post.userId,
          isEditingState: true
        } as Post;
      }
      return post;
    })]);
  };

  useEffect(() => {
    setPosts([...props.posts]);
  }, [props.posts]);

  return (
    <React.Fragment>
      {
        <table>
          <thead>
            <tr>
              <th>Post Id</th>
              <th>Content</th>
              <th>User Id</th>
              {
                props.canEdit === true ?
                <th>Update Status</th>
                : <th></th>
              }
            </tr>
          </thead>

          <tbody>
            {
              posts.map(post => {
                return (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>
                      {
                        post.isEditingState === true
                          ? 
                          <div>
                            <textarea defaultValue={post.content} onChange={(e) => setCurrentEdit(e.target.value)}></textarea>
                            <button onClick={() => { setPosts([...props.posts]) }}>Cancel</button>
                            <button onClick={() => { props.saveEditPost(post.id, currentEdit) }}>Save</button>
                          </div>
                          : `${post.content}`
                      }
                    </td>
                    <td>{post.userId}</td>
                    {
                      props.canEdit === true && post.isEditingState !== true ?
                        <td>
                          <button onClick={() => props.deletePost(post.id)}>Delete</button> ||
                          <button onClick={() => editPost(post.id)}>Edit</button>
                        </td>
                        : <td></td>
                    }
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