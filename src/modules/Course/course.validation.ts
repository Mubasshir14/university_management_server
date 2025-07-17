import { z } from 'zod';

const createCourseValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    courseCode: z.string(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
  }),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    courseCode: z.string().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
};
