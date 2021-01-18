import { Connection, MysqlError } from "mysql";
import * as core from "express-serve-static-core";

export class ControllerBase {
  constructor(protected connection: Connection) { }

  protected sendResponse(
    err: MysqlError | null,
    rows: any,
    res: core.Response
  ) {
    if (err) {
      res.status(500).json();
    } else {
      res.status(200).json(rows);
    }
  }
}
