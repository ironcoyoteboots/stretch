import { z } from 'zod';

export const providerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.email({ message: 'Invalid email address' }),
    phone: z.string().regex(
        /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/,
        'Invalid phone number'
    ),
    bio: z.string().min(1, { message: 'Bio must be at least 20 characters' }),
});

export type ProviderInput = z.infer<typeof providerSchema>;
