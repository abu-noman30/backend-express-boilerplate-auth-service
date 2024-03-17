import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    user_id: z.string().optional(),
    user_role: z.string({
      required_error: 'Role is required'
    }),
    user_password: z.string().optional()
  })
});

export const UserZodSchema = {
  createUserZodSchema
};
