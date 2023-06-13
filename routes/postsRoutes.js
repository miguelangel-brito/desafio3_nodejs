import {Router} from "express"
import { todoController } from "../controllers/todoController.js";
const router = Router ();

//GET /api/posts

router.get("/posts",todoController.getallPosts );
router.get("/posts/:id", todoController.getAllid);
router.post("/posts", todoController.agregarAll);
router.put ("/posts/:id",todoController.updatePost);
router.delete("/posts/:id",todoController.deletePost);


export default router;