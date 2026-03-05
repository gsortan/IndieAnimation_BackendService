import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { searchSchema } from "../validators/animation.validator";

export const createAnimation = async (req: Request, res: Response) => {
  try {
    const {
      title,
      imageURL,
      runtime,
      format,
      episodeCount,
      description,
      creators,
      releaseDate,
      platforms,
      ratingAvg,
      ratingCount,
    } = req.body;

    const normalizedCreators = Array.isArray(creators)
      ? creators
          .map((c: string) => c.trim().toLowerCase())
          .filter((c: string) => c.length > 0)
      : [];

    const animation = await prisma.animation.create({
      data: {
        title,
        imageURL,
        runtime,
        format,
        episodeCount,
        description,
        creators: normalizedCreators,
        releaseDate,
        platforms,
        ratingAvg,
        ratingCount,
      },
    });

    res.status(201).json(animation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create animation" });
  }
};

export const getAllAnimations = async (req: Request, res: Response) => {
  try {
    const animations = await prisma.animation.findMany();
    res.json(animations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch animations" });
  }
};

export const addTagsToAnimation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { tags } = req.body as { tags: string[] };

    if (!id || Number.isNaN(id)) {
      return res.status(400).json({ message: "Invalid animation id" });
    }

    if (!Array.isArray(tags) || tags.length === 0) {
      return res
        .status(400)
        .json({ message: "tags must be a non-empty array" });
    }

    const updated = await prisma.animation.update({
      where: { id },
      data: {
        tags: {
          connectOrCreate: tags.map((tagName) => ({
            where: { tagName },
            create: { tagName },
          })),
        },
      },
      include: { tags: true },
    });

    res.status(200).json(updated);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({ message: "Failed to add tags" });
  }
};

export const getAnimations = async (req: Request, res: Response) => {
  try {
    const result = searchSchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({ errors: result.error.issues });
    }

    const parsed = result.data;

    const normalizedCreators = parsed.creators
      .map((c) => c.trim())
      .filter(Boolean);

    const where = {
      ...(parsed.searchTerm?.trim() && {
        title: {
          contains: parsed.searchTerm.trim(),
          mode: "insensitive" as const,
        },
      }),
      ...(normalizedCreators.length > 0 && {
        creatorList: {
          some: {
            OR: normalizedCreators.map((c) => ({
              name: {
                contains: c,
                mode: "insensitive" as const,
              },
            })),
          },
        },
      }),
      ...(parsed.synopsis?.trim() && {
        description: {
          contains: parsed.synopsis.trim(),
          mode: "insensitive" as const,
        },
      }),
      ...(parsed.tags.length > 0 && {
        tags: { some: { id: { in: parsed.tags } } },
      }),
      ...((parsed.episodesMin !== undefined ||
        parsed.episodesMax !== undefined) && {
        episodeCount: {
          ...(parsed.episodesMin !== undefined && { gte: parsed.episodesMin }),
          ...(parsed.episodesMax !== undefined && { lte: parsed.episodesMax }),
        },
      }),
      ...((parsed.ratingMin !== undefined ||
        parsed.ratingMax !== undefined) && {
        ratingAvg: {
          ...(parsed.ratingMin !== undefined && { gte: parsed.ratingMin }),
          ...(parsed.ratingMax !== undefined && { lte: parsed.ratingMax }),
        },
      }),
      ...((parsed.yearMin !== undefined || parsed.yearMax !== undefined) && {
        releaseDate: {
          ...(parsed.yearMin !== undefined && {
            gte: new Date(`${parsed.yearMin}-01-01T00:00:00.000Z`),
          }),
          ...(parsed.yearMax !== undefined && {
            lte: new Date(`${parsed.yearMax}-12-31T23:59:59.999Z`),
          }),
        },
      }),
    };

    let orderBy: any = { createdAt: "desc" };

    if (parsed.sort === "alphabetical") {
      orderBy = { title: "asc" };
    }

    if (parsed.sort === "popularity") {
      orderBy = { ratingAvg: "desc" };
    }

    const [animations, count] = await Promise.all([
      prisma.animation.findMany({
        where,
        skip: parsed.skip,
        take: parsed.take,
        include: { tags: true },
        orderBy,
      }),
      prisma.animation.count({ where }),
    ]);

    res.json({ animations, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch animation" });
  }
};

export const getAnimationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const animation = await prisma.animation.findUnique({
      where: { id },
      include: { tags: true, creatorList:true },
    });

    if (!animation) {
      return res.status(404).json({ message: "Animation not found" });
    }

    res.json(animation);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch animation" });
  }
};
