import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { schemaForRegistration } from '../utils/validation.ts';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type RegistrationData = z.infer<typeof schemaForRegistration>;
const countries = [
  'United States (US)',
  'European (EU)',
  'Belarus(BY)',
  'Russia(RU)',
];
function RegistrationPage() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useForm<RegistrationData>({
    mode: 'onChange',
    resolver: zodResolver(schemaForRegistration),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      lastName: '',
      dateOfBirth: '',
      street: '',
      city: '',
      postalCode: '',
    },
  });

  const allFieldNames = Object.values(getValues());

  console.log(allFieldNames);
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT REGISTRATION</h2>
        <InputField
          register={register}
          label="Email"
          type="text"
          name="email"
          placeholder="example@example.com"
        />
        {errors.email && (
          <p className="h-5 text-red-500 text-[12px]">{errors.email.message}</p>
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
          name="name"
          placeholder="first name"
        />
        {errors.name && (
          <p className="h-5 text-red-500 text-[12px]">{errors.name.message}</p>
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
          name="street"
          placeholder="street"
        />
        {errors.street && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.street.message}
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
          <p className="h-5 text-red-500 text-[12px]">{errors.city.message}</p>
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
        <Button text="Sing Up" />
      </div>
    </div>
  );
}

export default RegistrationPage;
