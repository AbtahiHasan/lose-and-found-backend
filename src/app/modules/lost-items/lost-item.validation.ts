import { z } from 'zod';
const loseItemValidationSchema = z.object({
  category: z.string(),
  description: z.string(),
  date: z.date(),
  location: z.string(),
  email: z.string().email(),
  status: z.enum(['found', 'not found']),
});

const loseValidationSchemas = {
  loseItemValidationSchema,
};
export default loseValidationSchemas;
