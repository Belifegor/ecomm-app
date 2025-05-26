import { Header } from '../components/Header';
import Button from '../components/button.tsx';
import ProfileValueItem from '../components/profileComponents/ProfileValueItem.tsx';
import SavedAddressBlock from '../components/profileComponents/SavedAddressBlock.tsx';
import { authStore } from '../store/store.ts';
import { Customer } from '@commercetools/platform-sdk';

function ProfilePage() {
  const currentCustomer: Customer | null = authStore.getState().customer;
  const isSameResult = isSameAddress();

  return (
    <>
      <Header />
      <div className="max-w-[1440px] mx-auto flex flex-col items-center px-8 xl:px-40 md:items-start">
        <h2 className="text-2xl font-bold mb-10 ">My Profile</h2>
        <div className="flex flex-col w-1/1 md:flex-row gap-5">
          <div className="w-1/1 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">User Information</h3>
            <div className="flex flex-col min-w-[300px] w-1/1 space-y-4 border border-[#EBEBEB] rounded-[10px] p-[10px]">
              {/*<ProfileValueItem label="Email:" value={''} />*/}
              {/*<ProfileValueItem label="Password:" value={''} />*/}
              <ProfileValueItem
                label="First Name:"
                value={currentCustomer?.firstName}
              />
              <ProfileValueItem
                label="Last Name:"
                value={currentCustomer?.lastName}
              />
              <ProfileValueItem
                label="Date of birth:"
                value={currentCustomer?.dateOfBirth}
              />
            </div>
          </div>
          <div className="w-1/1 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
            <div className="flex flex-col min-w-[300px] w-1/1">
              {currentCustomer?.addresses[0] && (
                <SavedAddressBlock
                  title="Shipping Address"
                  address={currentCustomer.addresses[0]}
                />
              )}

              {!isSameResult && currentCustomer?.addresses[1] && (
                <SavedAddressBlock
                  title="Billing Address"
                  address={currentCustomer.addresses[1]}
                />
              )}
              {/*{adderesses ? adderesses.map((address) => (*/}

              {/*  <SavedAddressBlock title={} address={address} />*/}

              {/*)) : false}*/}
            </div>
          </div>
        </div>
        <Button
          type="button"
          text="Edit Profile"
          className="max-w-[200px] min-w-[100px] md:ml-auto"
        />
      </div>
    </>
  );
}

function isSameAddress() {
  const currentCustomer: Customer | null = authStore.getState().customer;
  if (currentCustomer) {
    const billingAddress = currentCustomer.addresses.find(
      (item) => item.id === currentCustomer.defaultBillingAddressId
    )!;
    const shippingAddress = currentCustomer.addresses.find(
      (item) => item.id === currentCustomer.defaultShippingAddressId
    )!;
    return billingAddress.id === shippingAddress.id;
  }
}
export default ProfilePage;
