import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { Post } from "../models/post";

export class PostController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  addPost(req: core.Request, res: core.Response) {
    const post: Post = {
      Content: req.body.content,
      UserId: req.body.userId,
    };

    this.connection.query({
        sql: "INSERT INTO POSTS SET ?",
        values: [post],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }

  getPostsByUserId(userId: number, onlySelf: boolean, res: core.Response) {
    let query = `
      SELECT Id, Content, UserId
      FROM Posts p 
    `;

    if (onlySelf === true) {
      query += `
        WHERE p.UserId = ${userId}
      `;
    } else {
      query += `
        WHERE p.UserId IN (
          SELECT DISTINCT followingUserId FROM Followers WHERE userId = ${userId}
        )
      `;
    }

    this.connection.query({
      sql: query,
      values: [userId],
    }, (err, rows) => this.sendResponse(err, rows, res)
    );
  }

  deletePost(postId: number, res: core.Response) {
    this.connection.query({
        sql: "DELETE FROM Posts WHERE Id = ?",
        values: [postId],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }
}
