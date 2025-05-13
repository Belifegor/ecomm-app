import { z } from 'zod';

export const schemaForLogin = z.object({
  email: z
    .string()
    //.email({ message: 'Wrong email' }),
    .refine((val) => val === val.trim(), {
      message: 'Email must not contain leading or trailing whitespace',
    })
    .superRefine((val, ctx) => {
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

export const schemaForRegistration = schemaForLogin.extend({
  name: z
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
        const age = now.getFullYear() - birthDate.getFullYear();
        if (age < 13) {
          return false;
        } else if (
          now.getMonth() < birthDate.getMonth() ||
          (now.getMonth() === birthDate.getMonth() &&
            now.getDate() < birthDate.getDate())
        ) {
          return false;
        }
        return true;
      },
      {
        message: 'You must be over 13 years old',
      }
    ),
  // .refine((val) => {
  //   const birthDate = new Date(val);
  //   const now = new Date();
  //   return  birthDate <= now
  // },{
  //   message: 'Wrong date',
  // }),
  street: z.string().min(1),
  city: z
    .string()
    .min(1, { message: 'Field must contain at least one letter' })
    .refine((val) => !/[^A-Za-z]/.test(val), {
      message: 'Field must not contain digits and special symbols',
    }),
  postalCode: z
    .string()
    .min(1, { message: 'Field must contain at least one letter' })
    .refine((/*val*/) => {
      //соответствие формату кода ???
    }),
  country: z
    .string()
    .min(1, { message: 'Field must contain at least one letter' }),
  //переделать в выпадающий спиок, уточнить страны
});

// export const getErrorMessage = (
//   error: ZodError | undefined,
//   field: string
// ): string | null => {
//   if (!error) return null;
//   console.log(error.issues);
//   const issue = error.issues.find((issue) => issue.path[0] === field);
//   return issue?.message ?? null;
// };
