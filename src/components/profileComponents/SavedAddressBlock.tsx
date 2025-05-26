import ProfileValueItem from './ProfileValueItem.tsx';
// type Address = {
//   street: string;
//   city: string;
//   postalCode: string;
// };
function SavedAddressBlock({
  title /*address*/,
}: {
  title: string /*address: Address */;
}) {
  return (
    <div className="border border-[#EBEBEB] rounded-[10px] p-[10px] mb-10">
      <h4 className="font-medium mb-2">{title}</h4>
      <div className="flex flex-col gap-2">
        <ProfileValueItem label="Street:" value={'address.street'} />
        <ProfileValueItem label="City:" value={'address.city'} />
        <ProfileValueItem label="Postal Code:" value={'address.postalCode'} />
      </div>
    </div>
  );
}
export default SavedAddressBlock;
