import { RegistrationData } from '../pages/RegistrationPage.tsx';

const countryMap = {
  'Russia(RU)': 'RU',
  'Belarus(BY)': 'BY',
  'United States (US)': 'US',
  'European (EU)': 'DE',
};

export function mapRegistrationData(formData: RegistrationData) {
  return {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    addresses: [
      {
        streetName: formData.streetName,
        city: formData.city,
        postalCode: formData.postalCode,
        country: countryMap[formData.country],
      },
    ],
    defaultShippingAddress: 0,
    defaultBillingAddress: 0,
  };
}
