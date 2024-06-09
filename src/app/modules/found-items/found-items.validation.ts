import { z } from 'zod';
const foundItemValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    description: z.string(),
    date: z.string(),
    location: z.string(),
    email: z.string().email(),
    image: z.any(),
    // status: z.enum(['found', 'not found']),
  }),
});

const claimValidationSchema = z.object({
  body: z.object({
    id: z.string().min(1, 'id is required'),
    description: z.string().min(1, 'description is required'),
  }),
});

const loseValidationSchemas = {
  foundItemValidationSchema,
  claimValidationSchema,
};
export default loseValidationSchemas;
