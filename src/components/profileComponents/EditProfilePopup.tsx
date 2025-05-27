import { schemaForRegistrationBase } from '../../utils/validation.ts';
import { z } from 'zod';
import InputField from '../inputField.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Button from '../button.tsx';

function EditProfilePopup({ handleEvent }: { handleEvent: () => void }) {
  type EditValidation = z.infer<typeof schemaForRegistrationBase>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditValidation>({
    resolver: zodResolver(schemaForRegistrationBase),
    mode: 'onChange',
  });
  const onChange = () => {
    console.log(111);
  };
  return (
    <div className=" w-1/3 min-w-[350px] h-7/10 fixed bg-white rounded-[10px] border border-[#EBEBEB] top-[60px], left-1/3 p-8">
      <form onSubmit={handleSubmit(onChange)} className="flex flex-col gap-4">
        <InputField
          register={register}
          label="Email"
          name="email"
          type="text"
          placeholder=""
        />
        {errors.email && (
          <p className="h-5 text-red-500 text-[12px]">{errors.email.message}</p>
        )}
        <InputField
          register={register}
          label="Password"
          name="password"
          type="text"
          placeholder=""
        />
        {errors.password && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.password.message}
          </p>
        )}

        <InputField
          register={register}
          label="First Name"
          name="firstName"
          type="text"
          placeholder=""
        />
        {errors.firstName && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.firstName.message}
          </p>
        )}
        <InputField
          register={register}
          label="Last Name"
          name="lastName"
          type="text"
          placeholder=""
        />
        {errors.lastName && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.lastName.message}
          </p>
        )}
        <InputField
          register={register}
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          placeholder=""
        />
        {errors.dateOfBirth && (
          <p className="h-5 text-red-500 text-[12px]">
            {errors.dateOfBirth.message}
          </p>
        )}
        <div className="flex justify-between gap-3">
          <Button
            type="submit"
            text="Save Changes"
            disabled={!isValid}
            className="max-w-[150px] min-w-[80px] text-white"
          />
          <Button
            type="button"
            text="Cancel Changes"
            disabled={false}
            onClick={handleEvent}
            className="max-w-[150px] min-w-[80px] bg-white text-[#9F9F9F]  border border-[#EBEBEB]"
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfilePopup;
