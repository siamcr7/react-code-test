import React from "react"
import { Post } from "../shared/interfaces/models/post"

export function PostList(props: { posts: Post[], canEdit?: boolean, deletePost: (postId: number) => void }) {
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
              props.posts.map(post => {
                return (
                  <tr key={post.id}>
                    <td>{post.id}</td>
                    <td>{post.content}</td>
                    <td>{post.userId}</td>
                    {
                      props.canEdit === true ?
                        <td><button onClick={() => props.deletePost(post.id)}>Delete</button></td>
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