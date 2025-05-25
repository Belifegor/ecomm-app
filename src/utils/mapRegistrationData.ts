import { RegistrationData } from '../pages/RegistrationPage.tsx';

const countryMap = {
  'Russia(RU)': 'RU',
  'Belarus(BY)': 'BY',
  'United States (US)': 'US',
  'European (EU)': 'DE',
};

export function mapRegistrationData(formData: RegistrationData) {
  console.log(formData);
  const addresses = [
    {
      streetName: formData.shippingAddress.streetName,
      city: formData.shippingAddress.city,
      postalCode: formData.shippingAddress.postalCode,
      country: countryMap[formData.shippingAddress.country],
    },
  ];

  if (formData.billingAddress && !formData.saveAsBilling) {
    addresses.push({
      streetName: formData.billingAddress.streetName,
      city: formData.billingAddress.city,
      postalCode: formData.billingAddress.postalCode,
      country: countryMap[formData.billingAddress.country],
    });
  }
  return {
    email: formData.email,
    password: formData.password,
    firstName: formData.firstName,
    lastName: formData.lastName,
    dateOfBirth: formData.dateOfBirth,
    addresses,
    defaultShippingAddress: 0,
    defaultBillingAddress: formData.saveAsBilling ? 0 : 1,
  };
}
