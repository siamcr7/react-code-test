import { Connection } from "mysql";
import { ControllerBase } from "./controller-base";
import * as core from "express-serve-static-core";

export class UserController extends ControllerBase {
  constructor(protected connection: Connection) {
    super(connection);
  }

  getUsers(res: core.Response) {
    this.connection.query("SELECT * FROM Users", (err, rows) =>
      this.sendResponse(err, rows, res)
    );
  }

  addUser(req: core.Request, res: core.Response) {
    const user  = {
      Name: req.body.name,
    };

    this.connection.query({
        sql: "INSERT INTO USERS SET ?",
        values: [user],
      },
      (err, rows) => this.sendResponse(err, {}, res)
    );
  }
}
