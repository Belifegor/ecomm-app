import ProfileValueItem from './ProfileValueItem.tsx';
import { Address, Customer } from '@commercetools/platform-sdk';
import ButtonForEditAddress from './ButtonForEditAddress.tsx';
import { authStore } from '../../store/store.ts';
const currentCustomer: Customer | null = authStore.getState().customer;

function SavedAddressBlock({
  title,
  address,
}: {
  title?: string;
  address: Address;
}) {
  console.log(address);
  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-[10px] mb-12">
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <div className="flex flex-col gap-2">
        <ProfileValueItem label="Country" value={address.country} />
        <ProfileValueItem label="Street:" value={address.streetName} />
        <ProfileValueItem label="City:" value={address.city} />
        <ProfileValueItem label="Postal Code:" value={address.postalCode} />
      </div>
      <ButtonForEditAddress text="Edit" />
      <ButtonForEditAddress text="Delete" />
      {address.id !== currentCustomer?.defaultShippingAddressId && (
        <ButtonForEditAddress text="Make as default Shipping" />
      )}
      {address.id !== currentCustomer?.defaultBillingAddressId && (
        <ButtonForEditAddress text="Make as default Billing" />
      )}
    </div>
  );
}

export default SavedAddressBlock;
