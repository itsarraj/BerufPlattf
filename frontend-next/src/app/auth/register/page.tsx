export default function RegisterPage() {
  return (
    <div className="w-[382px] flex flex-col gap-6">
      {/* Back Button */}
      <div className="w-[382px] h-7 flex items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6"></div>
          <span className="font-normal text-[18px] text-center text-[#fcc636]">
            Back
          </span>
        </div>
      </div>

      {/* Heading */}
      <div className="w-[380px] h-7 flex items-center gap-2.5 py-3">
        <span className="font-bold text-[18px] leading-[26px] text-center text-white">
          Hello...
        </span>
      </div>

      {/* Title */}
      <div className="w-[380px] h-[72px] flex justify-center items-center gap-2.5">
        <span className="font-bold text-[48px] leading-[2.9166666169961295%] text-center text-white">
          Register
        </span>
      </div>

      {/* Form */}
      <div className="h-[446px] w-[380px] flex flex-col gap-4">
        {/* Full Name */}
        <div className="w-[380px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] leading-[9.999999829701014%] text-white">
            Full Name
          </span>
        </div>
        <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] leading-[22px] text-[#fcc636]">
            animesh Raj
          </span>
        </div>

        {/* Email */}
        <div className="w-[380px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] leading-[9.999999829701014%] text-white">
            Email
          </span>
        </div>
        <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] leading-[22px] text-white">
            Placeholder
          </span>
        </div>

        {/* Password */}
        <div className="w-[380px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] leading-[9.999999829701014%] text-white">
            Password
          </span>
        </div>
        <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] leading-[22px] text-white">
            Placeholder
          </span>
        </div>

        {/* Confirm Password */}
        <div className="w-[380px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] leading-[9.999999829701014%] text-white">
            Confirm Password
          </span>
        </div>
        <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] leading-[22px] text-white">
            Placeholder
          </span>
        </div>
      </div>

      {/* Register Button */}
      <div className="w-[380px] flex justify-center items-center gap-2">
        <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
          <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
            Register
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[380px] h-px flex justify-center items-center gap-2.5 bg-[#2b2b2b] px-[44px] py-3"></div>

      {/* Social Icons */}
      <div className="w-[380px] h-[51px] flex justify-between items-center px-4">
        {/* Add SVG icons here */}
      </div>

      {/* Login Link */}
      <div className="w-[380px] h-[44px] flex justify-center items-center gap-2.5 px-[44px] py-3">
        <span className="font-normal text-[14px] leading-[9.999999829701014%]">
          Already have account? Login
        </span>
      </div>
    </div>
  );
}