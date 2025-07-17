import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Name is required',
    }),
    // faculty: z.array(
    //   z.string({
    //     invalid_type_error: 'Academic faculty must be string',
    //     required_error: 'Faculty ID is required',
    //   })
    // ).nonempty({ message: 'At least one faculty ID is required' }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    faculty: z
      .array(
        z.string({
          invalid_type_error: 'Academic faculty must be string',
          required_error: 'Faculty ID is required',
        })
      )
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
