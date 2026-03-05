import { z } from "zod";

export const searchSchema = z.object({
  skip: z.coerce.number().int().min(0).default(0),
  take: z.coerce.number().int().min(1).max(100).default(20),

  searchTerm: z.string().optional(),
  creators: z
  .string()
  .optional()
  .transform((val) =>
    val
      ? val
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0)
      : [],
  ),
  synopsis: z.string().optional(),
  sort: z.string().optional(),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((n) => Number(n))
            .filter(Number.isFinite)
        : [],
    ),

  episodesMin: z.coerce.number().int().optional(),
  episodesMax: z.coerce.number().int().optional(),

  ratingMin: z.coerce.number().optional(),
  ratingMax: z.coerce.number().optional(),

  yearMin: z.coerce.number().int().optional(),
  yearMax: z.coerce.number().int().optional(),
});
