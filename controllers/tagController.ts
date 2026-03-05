import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createTag = async (req: Request, res: Response) => {
  try {
    const {
    tagName
    } = req.body;

    const tag = await prisma.tag.create({
      data: {
    tagName
      },
    });

    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tag" });
  }
};

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tags" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const tag = await prisma.tag.findUnique({
      where: { id },
    });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    res.json(tag);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tag" });
  }
};

export async function addTagsToAnimation(
  animationId: number,
  tagNames: string[]
) {
  return prisma.animation.update({
    where: { id: animationId },
    data: {
      tags: {
        connectOrCreate: tagNames.map((tagName) => ({
          where: { tagName },
          create: { tagName },
        })),
      },
    },
    include: { tags: true },
  });
}
