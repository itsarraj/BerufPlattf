'use client';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateUserProfile } from '@/features/user/userSlice';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { status } = useAppSelector((state) => state.user);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = (data: { name: string; email: string }) => {
    dispatch(updateUserProfile(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Profile fields */}
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}

function UserProfile() {
    <div className="h-[1419px] w-80 flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
      <div className="flex flex-col gap-6">
        {/* Back Button */}
        <div className="w-[272px] h-7 flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6"></div>
            <span className="font-normal text-[18px] text-center text-[#fcc636]">
              Back
            </span>
          </div>
        </div>
        <div className="w-[250px] h-px bg-[#2b2b2b]"></div>
      </div>

      {/* Profile Form */}
      <div className="h-[1163px] w-[250px] flex flex-col gap-4">
        {/* Full Name */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">Full Name</span>
        </div>
        <div className="w-[250px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] text-[#fcc636]">
            animesh Raj
          </span>
        </div>

        {/* Email */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">Email</span>
        </div>
        <div className="w-[250px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] text-white">Placeholder</span>
        </div>

        {/* Country Dropdown */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">Country</span>
        </div>
        <div className="flex flex-col gap-1 rounded-lg">
          <div className="w-[250px] h-[44px] flex items-center gap-2 bg-[#2b2b2b] px-4 py-2 rounded-lg">
            <span className="font-normal text-[14px] text-white">
              Pick an option
            </span>
          </div>
        </div>

        {/* About Me */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">About Me</span>
        </div>
        <div className="w-[250px] h-[88px] flex gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] text-white">Placeholder</span>
        </div>

        {/* Save Button */}
        <div className="w-[250px] flex items-center gap-2">
          <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
            <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
              Save Changes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}