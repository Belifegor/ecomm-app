import InputField from '../components/inputField.tsx';
import Button from '../components/button.tsx';

function RegistrationPage() {
  return (
    <div className="flex flex-col w-1/1 h-1/1 justify-center items-center">
      <div className="min-w-[360px] w-1/3 border border-[#EBEBEB] rounded-[10px] py-14 px-16">
        <h2 className="font-bold text-xl mb-10">ACCOUNT REGISTRATION</h2>
        <InputField
          label="Email"
          type="email"
          name="email"
          placeholder="example@example.com"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="password..."
        />
        <InputField
          label="First name"
          type="text"
          name="name"
          placeholder="first name"
        />
        <InputField
          label="Last name"
          type="text"
          name="lastName"
          placeholder="last name"
        />
        <InputField
          label="Date of birth"
          type="date"
          name="dateOfBirth"
          placeholder=""
        />
        <h2 className="font-bold text-xl mb-10">ADDRESS</h2>
        <InputField
          label="Street"
          type="text"
          name="street"
          placeholder="street"
        />
        <InputField label="City" type="text" name="city" placeholder="city" />
        <InputField
          label="Postal code"
          type="text"
          name="postalCode"
          placeholder="postal code"
        />
        <InputField
          label="Country"
          type="text"
          name="country"
          placeholder="country"
        />
        <Button text="Sing Up" />
      </div>
    </div>
  );
}

export default RegistrationPage;
