import { Header } from '../components/Header';
import Button from '../components/button.tsx';
import ProfileValueItem from '../components/profileComponents/ProfileValueItem.tsx';
import SavedAddressBlock from '../components/profileComponents/SavedAddressBlock.tsx';

export default function ProfilePage() {
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
              <ProfileValueItem label="First Name:" value={''} />
              <ProfileValueItem label="Last Name:" value={''} />
              <ProfileValueItem label="Date of birth:" value={''} />
            </div>
          </div>
          <div className="w-1/1 md:w-1/2">
            <h3 className="text-xl font-semibold mb-4">Addresses</h3>
            <div className="flex flex-col min-w-[300px] w-1/1">
              <SavedAddressBlock
                title="Shipping Address" /*address={'shipping}'*/
              />
              <SavedAddressBlock
                title="Billing Address" /*address={'billing'}*/
              />
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
