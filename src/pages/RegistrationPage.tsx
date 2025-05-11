import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';
import { getErrorMessage, schemaForRegistration } from '../utils/validation.ts';
import { ChangeEvent, useState } from 'react';

function RegistrationPage() {
  const [fields, setValue] = useState<Record<string, string>>({
    email: '',
    password: '',
    name: '',
    lastName: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const res = schemaForRegistration.safeParse({ ...fields });
  const onInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const newForm = { ...fields };
    newForm[name] = value;
    setValue(newForm);
  };
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT REGISTRATION</h2>
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="example@example.com"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'email')}
        </p>
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="password..."
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'password')}
        </p>
        <InputField
          label="First name"
          type="text"
          name="name"
          placeholder="first name"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">{getErrorMessage(res.error, 'name')}</p>
        <InputField
          label="Last name"
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'lastName')}
        </p>
        <InputField
          label="Date of birth"
          type="date"
          name="dateOfBirth"
          placeholder="MM/DD/YYYY"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'dateOfBirth')}
        </p>
        <h2 className="font-bold text-xl mb-10 mt-10">ADDRESS</h2>
        <InputField
          label="Street"
          type="text"
          name="street"
          placeholder="street"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'street')}
        </p>
        <InputField
          label="City"
          type="text"
          name="city"
          placeholder="city"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">{getErrorMessage(res.error, 'city')}</p>
        <InputField
          label="Postal code"
          type="text"
          name="postalCode"
          placeholder="postal code"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'postalCode')}
        </p>
        <InputField
          label="Country"
          type="text"
          name="country"
          placeholder="country"
          onChange={onInput}
        />
        <p className="h-8 text-red-500">
          {getErrorMessage(res.error, 'country')}
        </p>
        <Button text="Sing Up" />
      </div>
    </div>
  );
}

export default RegistrationPage;
