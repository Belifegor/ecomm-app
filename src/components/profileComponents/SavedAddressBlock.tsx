import ProfileValueItem from './ProfileValueItem.tsx';
import { Address, Customer } from '@commercetools/platform-sdk';
import ButtonForEditAddress from './ButtonForEditAddress.tsx';

function SavedAddressBlock({
  title,
  address,
  customer,
}: {
  key?: string;
  title?: string;
  address: Address;
  customer: Customer;
}) {
  console.log(address.id);
  console.log(customer.defaultShippingAddressId);
  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-[10px] mb-4">
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <div className="flex flex-col gap-2 mb-6">
        <ProfileValueItem label="Country" value={address.country} />
        <ProfileValueItem label="Street:" value={address.streetName} />
        <ProfileValueItem label="City:" value={address.city} />
        <ProfileValueItem label="Postal Code:" value={address.postalCode} />
      </div>
      <ButtonForEditAddress text="Edit" />
      <ButtonForEditAddress text="Delete" />
      {address.id !== customer.defaultShippingAddressId && (
        <ButtonForEditAddress text="Make as default Shipping" />
      )}
      {address.id !== customer.defaultBillingAddressId && (
        <ButtonForEditAddress text="Make as default Billing" />
      )}
    </div>
  );
}

export default SavedAddressBlock;
