export default function ChangePassword() {
  return (
    <div className="h-[718px] w-80 flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
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

      {/* Password Form */}
      <div className="h-[464px] w-[250px] flex flex-col gap-4">
        {/* Current Password */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">
            Current Password
          </span>
        </div>
        <div className="w-[250px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] text-white">Placeholder</span>
        </div>

        {/* New Password */}
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] text-white">
            New Password
          </span>
        </div>
        <div className="w-[250px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
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