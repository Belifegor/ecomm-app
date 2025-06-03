import ProfileValueItem from './ProfileValueItem.tsx';
import { Address, Customer } from '@commercetools/platform-sdk';
import Button from '../button.tsx';
import {
  AddressAction,
  changeRoleAddress,
} from '../../services/sdk/changeRoleAddress.ts';
import { useState } from 'react';
import { authStore } from '../../store/store.ts';
// import { addNewAddress } from '../../services/sdk/addNewAddress.ts';
import PopupWrapper from './PopupWrapper.tsx';
import UserVerificationPopup from './UserVerificationPopup.tsx';

function SavedAddressBlock({
  title,
  address,
  customer,
  // onChangeAddressRole,
}: {
  key?: string;
  title?: string;
  address: Address;
  customer: Customer;
  // onChangeAddressRole: (address: Address, role: AddressAction) => void;
}) {
  console.log(address.id);
  console.log(customer.defaultShippingAddressId);

  const [showVerification, setShowVerification] = useState(false);
  const [role, setRole] = useState<AddressAction>('setDefaultShippingAddress');
  const preChange = (address: Address, role: AddressAction) => {
    if (authStore.getState().userOptions === null) {
      setShowVerification(true);
    } else {
      changeRoleAddress(address, role);
    }
  };
  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-[10px] mb-4">
      {title && <h4 className="font-medium mb-2">{title}</h4>}
      <div className="flex flex-col gap-2 mb-6">
        <ProfileValueItem label="Country" value={address.country} />
        <ProfileValueItem label="Street:" value={address.streetName} />
        <ProfileValueItem label="City:" value={address.city} />
        <ProfileValueItem label="Postal Code:" value={address.postalCode} />
      </div>
      <Button
        text="Edit"
        type="button"
        className="w-15 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
        /*onClick={}*/
      />
      <Button
        text="Delete"
        type="button"
        className="w-15 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
        /*onClick={}*/
      />
      {address.id !== customer.defaultShippingAddressId && (
        <Button
          text="Make as default Shipping"
          type="button"
          className="w-40 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
          onClick={() => {
            setRole('setDefaultShippingAddress');
            preChange(address, role);
          }}
        />
      )}
      {address.id !== customer.defaultBillingAddressId && (
        <Button
          text="Make as default Billing"
          type="button"
          className="w-40 bg-white border border-[#9F9F9F] p-1 rounded-[7px] mr-2 text-xs"
          onClick={() => {
            setRole('setDefaultShippingAddress');
            preChange(address, role);
          }}
        />
      )}
      {showVerification && (
        <PopupWrapper
          children={
            <UserVerificationPopup
              onClose={() => setShowVerification(false)}
              onUpdate={() => changeRoleAddress(address, role)}
            />
          }
        />
      )}
    </div>
  );
}

export default SavedAddressBlock;
