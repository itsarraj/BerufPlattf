export default function ResetPasswordPage() {
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
      <div className="w-[380px] h-36 flex justify-center items-center gap-2.5">
        <span className="font-bold text-[48px] leading-[2.9166666169961295%] text-center text-white">
          {'Reset\nPassword'}
        </span>
      </div>

      {/* Form */}
      <div className="h-[117px] w-[380px] flex flex-col gap-4">
        <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
          <span className="font-normal text-[14px] leading-[9.999999829701014%] text-white">
            Email
          </span>
        </div>
        <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
          <span className="font-normal text-[14px] leading-[22px] text-[#fcc636]">
            animesh Raj
          </span>
        </div>
      </div>

      {/* Reset Button */}
      <div className="w-[380px] flex justify-center items-center gap-2">
        <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
          <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
            Reset
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-[380px] h-px flex justify-center items-center gap-2.5 bg-[#2b2b2b] px-[44px] py-3"></div>

      {/* Resend Link */}
      <div className="w-[380px] h-[44px] flex justify-center items-center gap-2.5 px-[44px] py-3">
        <span className="font-normal text-[14px] leading-[9.999999829701014%]">
          Didn’t get the email ? Resend
        </span>
      </div>
    </div>
  );
}