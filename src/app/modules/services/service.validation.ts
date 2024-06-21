import { z } from 'zod';

const ServicesValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0, 'Price must be non-negative'),
  duration: z.number().min(1, 'Duration must be at least 1 minute'),
  isDeleted: z.boolean().default(false),
});

export default ServicesValidationSchema;
