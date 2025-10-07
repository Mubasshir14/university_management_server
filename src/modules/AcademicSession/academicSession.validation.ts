import { z } from 'zod';
import {
  AcademicSessionCode,
  AcademicSessionName,
  Months,
} from './academicSession.constant';

const createAcdemicSessionValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSessionName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSessionCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
});

const updateAcademicSessionValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSessionName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSessionCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...Months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...Months] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSessionValidations = {
  createAcdemicSessionValidationSchema,
  updateAcademicSessionValidationSchema,
};
