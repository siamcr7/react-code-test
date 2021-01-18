import { Connection } from "mysql";
import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";
import { Follower } from "../models/follower";

export class FollowerController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  getFollowingUserIdsByUserId(userId: number, res: core.Response) {
    this.connection.query(
      {
        sql: "SELECT DISTINCT followingUserId FROM Followers WHERE userId = ?",
        values: [userId],
      },
      (err, rows) =>
        this.sendResponse(
          err,
          (rows as any[]).map((row) => row.followingUserId),
          res
        )
    );
  }

  getFollowersByUserId(userId: number, res: core.Response) {
    this.connection.query(
      {
        sql: "SELECT DISTINCT userId FROM Followers WHERE followingUserId = ?",
        values: [userId],
      },
      (err, rows) =>
        this.sendResponse(
          err,
          (rows as any[]).map((row) => row.userId),
          res
        )
    );
  }

  addFollower(req: core.Request, res: core.Response) {
    const follower: Follower = {
      FollowingUserId: req.body.followingUserId,
      UserId: req.body.userId,
    };

    this.connection.query({
        sql: "INSERT INTO Followers SET ?",
        values: [follower],
      }, 
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }

  deleteFollower(userId: number, followingUserId: number, res: core.Response) {
    this.connection.query({
        sql: "DELETE FROM Followers WHERE UserId = ? AND FollowingUserId = ?",
        values: [userId, followingUserId],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }
}
