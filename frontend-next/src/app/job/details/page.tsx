export default function JobDetails() {
  return (
    <div className="h-[1693px] w-80 flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
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

        {/* Job Card */}
        <div className="h-[260px] w-[272px] flex flex-col justify-center items-center gap-3 bg-[#2b2b2b] p-4 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <span className="font-bold text-[18px] leading-[26px] text-white">
              Sr. Software Engineer
            </span>

            {/* Company Info */}
            <div className="w-60 flex items-center gap-1">
              <div className="w-6 h-6"></div>
              <span className="font-normal text-base text-white">Google</span>
            </div>

            {/* Location */}
            <div className="w-60 flex gap-1">
              <div className="w-6 h-6"></div>
              <span className="font-normal text-[14px] text-white">
                India Bangalore
              </span>
            </div>

            {/* Tags */}
            <div className="w-60 flex flex-wrap items-center gap-3">
              <div className="px-4 rounded-2xl border border-[#fcc636]">
                <span className="font-normal text-[12px] text-white">
                  50K / Year
                </span>
              </div>
              <div className="px-4 rounded-2xl border border-[#fcc636]">
                <span className="font-normal text-[12px] text-white">
                  Remote
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="w-40 h-8 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
              <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
                Apply
              </span>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="h-[260px] w-[272px] flex flex-col gap-3 bg-[#2b2b2b] p-4 rounded-lg">
          <span className="font-normal text-[14px] text-white">
            Job Description
          </span>
          <div className="flex gap-1 self-stretch h-[194px]">
            <span className="font-normal text-[12px] text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}