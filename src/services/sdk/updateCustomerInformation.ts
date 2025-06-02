import { EditValidation } from '../../components/profile/EditProfilePopup.tsx';
import { authStore } from '../../store/store.ts';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { createApiRoot } from './loginCustomer.ts';

export async function updateCustomer(
  data: EditValidation,
  closePopup: () => void
) {
  const currentCustomer = authStore.getState().customer;
  const userOptions = authStore.getState().userOptions;

  if (currentCustomer && userOptions) {
    const version = currentCustomer.version;
    const actions: MyCustomerUpdateAction[] = [];
    actions.push(
      { action: 'changeEmail', email: data.email },
      { action: 'setFirstName', firstName: data.firstName },
      { action: 'setLastName', lastName: data.lastName },
      { action: 'setDateOfBirth', dateOfBirth: data.dateOfBirth }
    );
    if (currentCustomer.password !== data.password) {
      console.log(currentCustomer.password, data.password);
      updatePassword();
    }
    const response = createApiRoot({
      email: userOptions?.userName,
      password: userOptions.password,
    })
      .me()
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute();
    console.log(response);
    console.log(version);
    response.then((res) => {
      console.log(res.statusCode);
      if (res.statusCode === 200) {
        updateSavedCustomer(data);
        closePopup();
      }
    });
  }
}

function updateSavedCustomer(data: EditValidation) {
  authStore.getState().updateCustomer({
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: data.dateOfBirth,
  });
  // authStore.getState().userOptions
}

function updatePassword() {
  console.log(1111);
}
