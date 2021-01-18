import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { UserController } from "./controllers/user-controller";

export class Router {
  constructor(private router: core.Router, private connection: Connection) {
    this.userRoutes();
  }

  private userRoutes() {
    const userController = new UserController(this.connection);
    this.router.get("/users", (req, res) => {
      userController.getUsers(res);
    });

    this.router.post('/users', (req, res) => {
      userController.addUser(req, res);
    });
  }
}
