export default function JobSearchPage() {
  return (
    <div className="h-[974px] w-[768px] flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
      <div className="w-[720px] flex flex-col gap-6">
        {/* Header */}
        <div className="w-[720px] flex justify-between items-center">
          <span className="font-bold text-[18px] leading-[26px] text-white">
            Hello Kabira 👋
          </span>
        </div>

        {/* Search and Filter Section */}
        <div className="w-[720px] flex items-center gap-4">
          <div className="w-[380px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
            <span className="font-normal text-[14px] text-white">
              Placeholder
            </span>
          </div>
          <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
            <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
              Filter
            </span>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="w-[720px] flex flex-wrap gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-[260px] w-[272px] flex flex-col justify-center items-center gap-3 bg-[#2b2b2b] p-4 rounded-lg"
            >
              <div className="flex flex-col items-center gap-3">
                <span className="font-bold text-[18px] leading-[26px] text-white">
                  Sr. Software Engineer
                </span>

                {/* Company Info */}
                <div className="w-60 flex items-center gap-1">
                  <div className="w-6 h-6"></div>
                  <span className="font-normal text-base text-white">
                    Google
                  </span>
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
          ))}
        </div>

        {/* Pagination */}
        <div className="w-[317px] flex justify-center items-center gap-1">
          <div className="w-12 h-12 flex justify-center items-center gap-2 bg-[#fcc636] p-4 rounded-lg">
            <div className="w-6 h-6"></div>
          </div>
          {[1, 2, 3, 4].map((page) => (
            <div
              key={page}
              className="w-8 h-8 flex justify-center items-center gap-2 bg-[#2b2b2b] p-4 rounded-lg"
            >
              <span className="font-bold text-[18px] leading-[26px] text-center text-[#fcc636]">
                {page}
              </span>
            </div>
          ))}
          <div className="w-12 h-12 flex justify-center items-center gap-2 bg-[#fcc636] p-4 rounded-lg">
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}