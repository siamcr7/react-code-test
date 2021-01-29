import * as core from "express-serve-static-core";
import { Connection } from "mysql";
import { FollowerController } from "./controllers/follower-controller";
import { PostController } from "./controllers/post-controller";
import { UserController } from "./controllers/user-controller";

export class Router {
  constructor(private router: core.Router, private connection: Connection) {
    this.userRoutes();
    this.postRoutes();
    this.followerRoutes();
  }

  private userRoutes() {
    const userController = new UserController(this.connection);
    this.router.get("/users", (req, res) => {
      userController.getUsers(res);
    });

    this.router.put("/users/visibility", (req, res) => {
      userController.updateVisibility(req, res);
    });

    this.router.post('/users', (req, res) => {
      userController.addUser(req, res);
    });
  }

  private postRoutes() {
    const postController = new PostController(this.connection);
    this.router.post('/posts', (req, res) => {
      postController.addPost(req, res);
    });

    this.router.put('/posts', (req, res) => {
      postController.updatePost(req, res);
    });

    this.router.get('/posts/:userId/:onlySelf', (req, res) => {
      postController.getPostsByUserId(+(req.params.userId), ((req.params.onlySelf) as string) === 'true', res);
    });

    this.router.delete('/posts/:postId', (req, res) => {
      postController.deletePost(+(req.params.postId), res);
    });
  }

  private followerRoutes() {
    const followerController = new FollowerController(this.connection);
    this.router.get('/followers/followers/:userId', (req, res) => {
      followerController.getFollowersByUserId(+(req.params.userId), res);
    });

    this.router.get('/followers/followings/:userId', (req, res) => {
      followerController.getFollowingUserIdsByUserId(+(req.params.userId), res);
    });

    this.router.post('/followers', (req, res) => {
      followerController.addFollower(req, res);
    });

    this.router.delete('/followers/:userId/:followingUserId', (req, res) => {
      followerController.deleteFollower(+(req.params.userId), +(req.params.followingUserId), res);
    });
  }
}
