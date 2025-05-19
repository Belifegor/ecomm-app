import { z } from 'zod';

export const schemaForLogin = z.object({
  email: z
    .string()
    //.email({ message: 'Wrong email' }),
    .refine((val) => val === val.trim(), {
      message: 'Email must not contain leading or trailing whitespace',
    })
    .superRefine((val: string, ctx: z.RefinementCtx) => {
      if (!val.includes('@')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must contain @ symbol',
          path: [],
        });
      }
      const [str, domain] = val.split('@');
      if (!domain || domain.trim() === '' || !domain.includes('.')) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must contain domain name',
        });
      }
      if (!str) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wrong email',
        });
      }
      if (!/\.[a-zA-Z]{2,}$/.test(domain)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Wrong domain format',
        });
      }
      if (/\s/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Email must not contain whitespace',
        });
      }
    }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((val) => !/\s/.test(val), {
      message: 'Password must not contain leading or trailing whitespace',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one digit',
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: 'Password must contain at least one special symbol',
    }),
});

export const schemaForRegistration = schemaForLogin
  .extend({
    firstName: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' })
      .refine((val) => !/[^A-Za-z]/.test(val), {
        message: 'Field must not contain digits and special symbols',
      }),
    lastName: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' })
      .refine((val) => !/[^A-Za-z]/.test(val), {
        message: 'Field must not contain digits and special symbols',
      }),
    dateOfBirth: z
      .string()
      .min(1, { message: 'Add your birth date' })
      .refine(
        (val) => {
          const birthDate = new Date(val);
          const now = new Date();
          return birthDate <= now;
        },
        {
          message: 'Wrong date',
        }
      )
      .refine(
        (val) => {
          const birthDate = new Date(val);
          const now = new Date();

          const thirteenYearsAgo = new Date(
            now.getFullYear() - 13,
            now.getMonth(),
            now.getDate()
          );

          return birthDate <= thirteenYearsAgo;
        },
        {
          message: 'You must be over 13 years old',
        }
      ),
    streetName: z.string().min(1),
    city: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' })
      .refine((val) => !/[^A-Za-z]/.test(val), {
        message: 'Field must not contain digits and special symbols',
      }),
    country: z.enum([
      'United States (US)',
      'European (EU)',
      'Belarus(BY)',
      'Russia(RU)',
    ]),
    // .min(1, { message: 'Field must contain at least one letter' }),
    postalCode: z
      .string()
      .min(1, { message: 'Field must contain at least one letter' }),
    defaultBillingAddress: z.boolean(),
  })
  .superRefine((data, ctx) => {
    const { country, postalCode } = data;
    // console.log(data.country)
    if (!postalCodePatterns[country].test(postalCode)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Wrong postal code format',
        path: ['postalCode'],
      });
    }
    console.log(postalCodePatterns[country].test(postalCode));
  });
// export const schemaForRegistrationFormatted = schemaForRegistration
//   .transform((data) => ({
//     email: data.email,
//     password: data.password,
//     firstName: data.firstName,
//     lastName: data.lastName,
//     dateOfBirth: data.dateOfBirth,
//     addresses: [
//       {
//         streetName: data.streetName,
//         city: data.city,
//         postalCode: data.postalCode,
//         country: data.country,
//       }
//     ],
//   }))

const postalCodePatterns: Record<string, RegExp> = {
  'United States (US)': /^\d{5}$/,
  'European (EU)': /^[A-Z0-9\s-]{3,10}$/i,
  'Belarus(BY)': /^\d{6}$/,
  'Russia(RU)': /^\d{6}$/,
};
// export const getErrorMessage = (
//   error: ZodError | undefined,
//   field: string
// ): string | null => {
//   if (!error) return null;
//   console.log(error.issues);
//   const issue = error.issues.find((issue) => issue.path[0] === field);
//   return issue?.message ?? null;
// };
