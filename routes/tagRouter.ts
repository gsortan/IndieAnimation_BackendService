import { Router } from "express";
import {
  createTag,
 getAllTags,
  getTagById,
} from "../controllers/tagController";

const tagRouter = Router();

tagRouter.post("/create-tag", createTag);
tagRouter.get("/all-tags", getAllTags);
tagRouter.get("/:id", getTagById);

export default tagRouter;