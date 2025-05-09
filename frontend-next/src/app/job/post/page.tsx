'use client';
import { useAppDispatch } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { createJob } from '@/features/jobs/jobsSlice';
import { useRouter } from 'next/navigation';

export default function JobPostPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: {
    title: string;
    description: string;
    location: string;
  }) => {
    dispatch(createJob(data))
      .unwrap()
      .then(() => router.push('/jobs'));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Job form fields */}
      <button type="submit">Post Job</button>
    </form>
  );
}
export default function JobPostForm() {
  return (
    <div className="h-[2396px] w-80 flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
      <div className="h-[2256px] w-[272px] flex flex-col gap-6">
        {/* Header Section */}
        <div className="w-[272px] flex justify-between items-center">
          <span className="font-bold text-[18px] leading-[26px] text-white">
            Hello Kabira 👋
          </span>
        </div>

        {/* Create Job Button */}
        <div className="w-[250px] flex flex-col justify-center items-center gap-2">
          <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#2b2b2b] px-4 py-3 rounded-lg">
            <span className="font-bold text-[16px] text-center text-[#fcc636]">
              Create Job Post
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="h-[1943px] w-[250px] flex flex-col gap-4">
          {/* Job Position */}
          <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
            <span className="font-normal text-[14px] text-white">
              Job position
            </span>
          </div>
          <div className="w-[250px] h-[44px] flex items-center gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
            <span className="font-normal text-[14px] text-white">
              Placeholder
            </span>
          </div>

          {/* Compensation Dropdown */}
          <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
            <span className="font-normal text-[14px] text-white">
              Compensation
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg">
            <div className="w-[250px] h-[44px] flex items-center gap-2 bg-[#2b2b2b] px-4 py-2 rounded-lg">
              <span className="font-normal text-[14px] text-white">
                Pick an option
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
            <span className="font-normal text-[14px] text-white">
              Job description
            </span>
          </div>
          <div className="w-[250px] h-[88px] flex gap-3 bg-[#2b2b2b] px-4 py-3 rounded-lg">
            <span className="font-normal text-[14px] text-white">
              Placeholder
            </span>
          </div>

          {/* Divider */}
          <div className="w-[250px] h-px bg-[#2b2b2b]"></div>

          {/* Employment Type Dropdown */}
          <div className="w-[250px] h-8 flex items-center gap-2.5 py-3">
            <span className="font-normal text-[14px] text-white">
              Employment Type
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-lg">
            <div className="w-[250px] h-[44px] flex items-center gap-2 bg-[#2b2b2b] px-4 py-2 rounded-lg">
              <span className="font-normal text-[14px] text-white">
                Pick an option
              </span>
            </div>
          </div>

          {/* Create Job Button */}
          <div className="w-[250px] flex items-center gap-2">
            <div className="w-40 h-14 flex justify-center items-center gap-2 bg-[#fcc636] px-4 py-3 rounded-lg">
              <span className="font-bold text-[16px] text-center text-[#2b2b2b]">
                Create Job
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}