import React from "react"
import { Post } from "../shared/interfaces/models/post"

export function PostList(props: { posts: Post[] }) {
  return (
    <React.Fragment>
      {
        <table>
          <thead>
            <tr>
              <th>Post Id</th>
              <th>Content</th>
              <th>User Id</th>
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