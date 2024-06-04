import { z } from 'zod';
const userRegistrationValidationSchema = z.object({
  body: z.object({
    username: z.string({ invalid_type_error: 'username must be string' }),
    email: z.string({ invalid_type_error: 'email must be string' }),
    password: z.string({ invalid_type_error: 'password must be string' }),
  }),
});
const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ invalid_type_error: 'email must be string' }),
    password: z.string({ invalid_type_error: 'password must be string' }),
  }),
});
const userChangePasswordValidationSchema = z.object({
  body: z.object({
    currentPassword: z.string({
      invalid_type_error: 'username must be string',
    }),
    newPassword: z.string({ invalid_type_error: 'password must be string' }),
  }),
});
const updateProfileValidationSchema = z.object({
  body: z.object({
    username: z
      .string({
        invalid_type_error: 'username must be string',
      })
      .optional(),
    email: z.string({ invalid_type_error: 'email must be string' }).optional(),
  }),
});

const userValidationSchemas = {
  userRegistrationValidationSchema,
  userLoginValidationSchema,
  userChangePasswordValidationSchema,
  updateProfileValidationSchema,
};
export default userValidationSchemas;
