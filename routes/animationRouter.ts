import { Router } from "express";
import {
  createAnimation,
  getAllAnimations,
  addTagsToAnimation,
  getAnimationById,
  getAnimations
} from "../controllers/animationController";

const animationRouter = Router();

animationRouter.post("/create-animation", createAnimation);
animationRouter.get("/all-animations", getAllAnimations);
animationRouter.post("/:id/tags", addTagsToAnimation);
animationRouter.get("/searchAnimation", getAnimations)
animationRouter.get("/:id", getAnimationById);

export default animationRouter;