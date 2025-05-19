import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { schemaForRegistration } from '../utils/validation.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link /*useNavigate*/ } from 'react-router-dom';
import { registerAction } from '../routes/registrationAction.ts';
import { useState } from 'react';

export type RegistrationData = z.infer<typeof schemaForRegistration>;
const countries = [
  'United States (US)',
  'European (EU)',
  'Belarus(BY)',
  'Russia(RU)',
];
function Registration() {
  // const navigate = useNavigate();
  const [regError, setRegError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // getValues,
  } = useForm<RegistrationData>({
    mode: 'onChange',
    resolver: zodResolver(schemaForRegistration),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      streetName: '',
      city: '',
      postalCode: '',
      defaultBillingAddress: false,
    },
  });

  // const allFieldNames = Object.values(getValues());
  const registrationCustomer = (formData: RegistrationData) => {
    registerAction(formData)
      .then((res) => {
        console.log(res);
        setRegError(null);
        // navigate('/main');
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setRegError(error.message);
        } else {
          setRegError('An unknown error occurred');
        }
      });
  };

  // console.log(allFieldNames);
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT REGISTRATION</h2>
        <form onSubmit={handleSubmit(registrationCustomer)}>
          <InputField
            register={register}
            label="Email"
            type="text"
            name="email"
            placeholder="example@example.com"
          />
          {errors.email && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.email.message}
            </p>
          )}
          <InputField
            register={register}
            label="Password"
            type="password"
            name="password"
            placeholder="password..."
          />
          {errors.password && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.password.message}
            </p>
          )}
          <InputField
            register={register}
            label="First name"
            type="text"
            name="firstName"
            placeholder="first name"
          />
          {errors.firstName && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.firstName.message}
            </p>
          )}
          <InputField
            register={register}
            label="Last name"
            type="text"
            name="lastName"
            placeholder="last name"
          />
          {errors.lastName && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.lastName.message}
            </p>
          )}
          <InputField
            register={register}
            label="Date of birth"
            type="date"
            name="dateOfBirth"
            placeholder="MM/DD/YYYY"
          />
          {errors.dateOfBirth && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.dateOfBirth.message}
            </p>
          )}
          <h2 className="font-bold text-xl mb-10 mt-10">ADDRESS</h2>
          <InputField
            register={register}
            label="Street"
            type="text"
            name="streetName"
            placeholder="street"
          />
          {errors.streetName && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.streetName.message}
            </p>
          )}
          <InputField
            register={register}
            label="City"
            type="text"
            name="city"
            placeholder="city"
          />
          {errors.city && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.city.message}
            </p>
          )}
          <label
            // htmlFor="country"
            className="text-left text-sm leading-8 text-[#545454]"
          >
            Country
          </label>
          <select
            id="country"
            className="border border-[#9F9F9F] w-full h-14 rounded-[7px] p-4 hover:cursor-pointer"
            {...register('country', { required: true })}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <InputField
            register={register}
            label="Postal code"
            type="text"
            name="postalCode"
            placeholder="postal code"
          />
          {errors.postalCode && (
            <p className="h-5 text-red-500 text-[12px]">
              {errors.postalCode.message}
            </p>
          )}
          <input
            type="checkbox"
            id="defaultBillingAddress"
            {...register('defaultBillingAddress')}
            className="w-4 h-4 mt-2 mr-2"
          />
          <label className="text-left text-sm leading-8 text-[#545454]">
            Make as default billing address
          </label>

          <Button text="Sing Up" type="submit" disabled={!isValid} />
          <p className="text-left text-sm leading-8 text-[#545454]">
            If you have an account yet
            <Link
              to="/login"
              className="text-sm hover:underline text-[#545454] "
            >
              {' '}
              Login
            </Link>
          </p>
        </form>
        {regError && <p className="h-5 text-red-500 text-[16px]">{regError}</p>}
      </div>
    </div>
  );
}

export default Registration;
